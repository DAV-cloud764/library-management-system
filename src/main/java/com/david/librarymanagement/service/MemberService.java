package com.david.librarymanagement.service;

import com.david.librarymanagement.entity.Member;
import com.david.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member saveMember(Member member) {

        member.setRegistrationDate(LocalDate.now());

        return memberRepository.save(member);
    }

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Member updateMember(Long id, Member updatedMember) {

        Optional<Member> optionalMember = memberRepository.findById(id);

        if (optionalMember.isEmpty()) {
            throw new RuntimeException("Member not found.");
        }

        Member existingMember = optionalMember.get();

        existingMember.setFullName(updatedMember.getFullName());
        existingMember.setEmail(updatedMember.getEmail());
        existingMember.setPhoneNumber(updatedMember.getPhoneNumber());
        existingMember.setAddress(updatedMember.getAddress());

        return memberRepository.save(existingMember);
    }

    public void deleteMember(Long id) {

        if (!memberRepository.existsById(id)) {
            throw new RuntimeException("Member not found.");
        }

        memberRepository.deleteById(id);
    }
}