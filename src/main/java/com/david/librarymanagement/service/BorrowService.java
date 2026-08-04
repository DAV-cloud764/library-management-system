package com.david.librarymanagement.service;

import com.david.librarymanagement.dto.BorrowHistoryDTO;
import com.david.librarymanagement.dto.OverdueBookDTO;
import com.david.librarymanagement.exception.*;
import com.david.librarymanagement.repository.BookRepository;
import com.david.librarymanagement.repository.BorrowRecordRepository;
import com.david.librarymanagement.repository.MemberRepository;
import org.springframework.stereotype.Service;
import com.david.librarymanagement.dto.BorrowRequestDTO;
import com.david.librarymanagement.entity.Book;
import com.david.librarymanagement.entity.BorrowRecord;
import com.david.librarymanagement.entity.Member;
import com.david.librarymanagement.dto.ReturnBookRequestDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class BorrowService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final BookRepository bookRepository;
    private final MemberRepository memberRepository;

    public BorrowService(BorrowRecordRepository borrowRecordRepository,
                         BookRepository bookRepository,
                         MemberRepository memberRepository) {

        this.borrowRecordRepository = borrowRecordRepository;
        this.bookRepository = bookRepository;
        this.memberRepository = memberRepository;
    }

    @Transactional
    public BorrowRecord borrowBook(BorrowRequestDTO request) {

        Optional<Member> optionalMember =
                memberRepository.findById(request.getMemberId());

        if (optionalMember.isEmpty()) {
            throw new MemberNotFoundException("Member not found.");
        }

        Optional<Book> optionalBook =
                bookRepository.findById(request.getBookId());

        if (optionalBook.isEmpty()) {
            throw new BookNotFoundException("Book not found.");
        }

        Book book = optionalBook.get();

        if (book.getAvailableQuantity() <= 0) {
            throw new BookUnavailableException(
                    "No available copies of this book."
            );
        }

        // Reduce available copies
        book.setAvailableQuantity(book.getAvailableQuantity() - 1);

        // Create borrow record
        BorrowRecord borrowRecord = new BorrowRecord();

        borrowRecord.setMember(optionalMember.get());
        borrowRecord.setBook(book);
        borrowRecord.setBorrowDate(LocalDate.now());
        borrowRecord.setDueDate(LocalDate.now().plusDays(14));
        borrowRecord.setReturned(false);

        // Save changes
        bookRepository.save(book);

        return borrowRecordRepository.save(borrowRecord);
    }

    @Transactional
    public BorrowRecord returnBook(ReturnBookRequestDTO request) {

        Optional<BorrowRecord> optionalBorrowRecord =
                borrowRecordRepository.findById(request.getBorrowRecordId());

        if (optionalBorrowRecord.isEmpty()) {
            throw new BorrowRecordNotFoundException(
                    "Borrow record not found."
            );
        }

        BorrowRecord borrowRecord = optionalBorrowRecord.get();

        if (borrowRecord.getReturned()) {
            throw new BookAlreadyReturnedException(
                    "Book has already been returned."
            );
        }

        Book book = borrowRecord.getBook();

        book.setAvailableQuantity(book.getAvailableQuantity() + 1);

        borrowRecord.setReturned(true);

        borrowRecord.setReturnDate(LocalDate.now());

        bookRepository.save(book);

        return borrowRecordRepository.save(borrowRecord);
    }

    public List<BorrowHistoryDTO> getBorrowHistory() {

        return borrowRecordRepository.findAll()
                .stream()
                .map(record -> new BorrowHistoryDTO(
                        record.getId(),
                        record.getMember().getFullName(),
                        record.getBook().getTitle(),
                        record.getBorrowDate(),
                        record.getDueDate(),
                        record.getReturnDate(),
                        record.getReturned()
                ))
                .toList();
    }

    public List<BorrowHistoryDTO> getCurrentBorrowedBooks() {

        return borrowRecordRepository.findByReturnedFalse()
                .stream()
                .map(record -> new BorrowHistoryDTO(
                        record.getId(),
                        record.getMember().getFullName(),
                        record.getBook().getTitle(),
                        record.getBorrowDate(),
                        record.getDueDate(),
                        record.getReturnDate(),
                        record.getReturned()
                ))
                .toList();
    }

    public List<OverdueBookDTO> getOverdueBooks() {

        return borrowRecordRepository
                .findByReturnedFalseAndDueDateBefore(LocalDate.now())
                .stream()
                .map(record -> new OverdueBookDTO(
                        record.getId(),
                        record.getMember().getFullName(),
                        record.getBook().getTitle(),
                        record.getDueDate(),
                        java.time.temporal.ChronoUnit.DAYS.between(
                                record.getDueDate(),
                                LocalDate.now()
                        )
                ))
                .toList();
    }

}