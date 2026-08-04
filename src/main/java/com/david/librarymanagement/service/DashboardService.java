package com.david.librarymanagement.service;

import com.david.librarymanagement.dto.DashboardDTO;
import com.david.librarymanagement.repository.BookRepository;
import com.david.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    public DashboardService(
            BookRepository bookRepository,
            MemberRepository memberRepository) {

        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    public DashboardDTO getDashboard() {

        long totalBooks = bookRepository.count();

        long totalMembers = memberRepository.count();

        long availableBooks = bookRepository.getTotalAvailableBooks();

        long totalCopies = bookRepository.getTotalBookCopies();

        long borrowedBooks = totalCopies - availableBooks;

        return new DashboardDTO(
                totalBooks,
                totalMembers,
                borrowedBooks,
                availableBooks
        );
    }
}