package com.david.librarymanagement.dto;

import java.time.LocalDate;

public class RecentBorrowDTO {

    private Long id;
    private String studentName;
    private String bookTitle;
    private LocalDate borrowDate;
    private LocalDate returnDate;
    private String status;

    public RecentBorrowDTO(
            Long id,
            String studentName,
            String bookTitle,
            LocalDate borrowDate,
            LocalDate returnDate,
            String status) {

        this.id = id;
        this.studentName = studentName;
        this.bookTitle = bookTitle;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public LocalDate getBorrowDate() {
        return borrowDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public String getStatus() {
        return status;
    }
}