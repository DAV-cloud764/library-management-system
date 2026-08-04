package com.david.librarymanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String SECRET =
            "1234567890123456789012345678901234567890123456789012345678901234";

    private SecretKey getSigningKey() {

        byte[] keyBytes = Decoders.BASE64.decode(
                Base64.getEncoder().encodeToString(SECRET.getBytes())
        );

        return Keys.hmacShaKeyFor(keyBytes);
    }

    // ==========================
    // Generate Token
    // ==========================

    public String generateToken(String username) {

        return Jwts.builder()
                .subject(username)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(getSigningKey())
                .compact();
    }

    // ==========================
    // Extract Username
    // ==========================

    public String extractUsername(String token) {

        return extractClaim(token, Claims::getSubject);
    }

    // ==========================
    // Extract Expiration Date
    // ==========================

    public Date extractExpiration(String token) {

        return extractClaim(token, Claims::getExpiration);
    }

    // ==========================
    // Generic Claim Extractor
    // ==========================

    public <T> T extractClaim(
            String token,
            Function<Claims, T> claimsResolver) {

        Claims claims = extractAllClaims(token);

        return claimsResolver.apply(claims);
    }

    // ==========================
    // Read All Claims
    // ==========================

    private Claims extractAllClaims(String token) {

        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // ==========================
    // Token Expiration Check
    // ==========================

    public boolean isTokenExpired(String token) {

        return extractExpiration(token).before(new Date());
    }

    // ==========================
    // Token Validation
    // ==========================

    public boolean isTokenValid(
            String token,
            UserDetails userDetails) {

        String username = extractUsername(token);

        return username.equals(userDetails.getUsername())
                && !isTokenExpired(token);
    }

}