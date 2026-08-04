package com.david.librarymanagement.controller;

import com.david.librarymanagement.dto.LoginRequestDTO;
import com.david.librarymanagement.dto.LoginResponseDTO;
import org.springframework.web.bind.annotation.*;
import com.david.librarymanagement.security.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public LoginResponseDTO login(
            @RequestBody LoginRequestDTO request) {

        System.out.println(">>> LOGIN ENDPOINT HIT <<<");

        authenticationManager.authenticate(

                new UsernamePasswordAuthenticationToken(

                        request.getUsername(),

                        request.getPassword()

                )
        );

        String token =
                jwtService.generateToken(request.getUsername());

        return new LoginResponseDTO(

                "Login successful.",

                token
        );
    }

    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthController(JwtService jwtService, AuthenticationManager authenticationManager) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

}