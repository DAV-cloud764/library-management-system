package com.david.librarymanagement.dto;

public class DashboardDTO {

    private long totalBooks;
    private long totalMembers;
    private long borrowedBooks;
    private long availableBooks;

    public DashboardDTO() {
    }

    public DashboardDTO(
            long totalBooks,
            long totalMembers,
            long borrowedBooks,
            long availableBooks) {

        this.totalBooks = totalBooks;
        this.totalMembers = totalMembers;
        this.borrowedBooks = borrowedBooks;
        this.availableBooks = availableBooks;
    }

    public long getTotalBooks() {
        return totalBooks;
    }

    public void setTotalBooks(long totalBooks) {
        this.totalBooks = totalBooks;
    }

    public long getTotalMembers() {
        return totalMembers;
    }

    public void setTotalMembers(long totalMembers) {
        this.totalMembers = totalMembers;
    }

    public long getBorrowedBooks() {
        return borrowedBooks;
    }

    public void setBorrowedBooks(long borrowedBooks) {
        this.borrowedBooks = borrowedBooks;
    }

    public long getAvailableBooks() {
        return availableBooks;
    }

    public void setAvailableBooks(long availableBooks) {
        this.availableBooks = availableBooks;
    }
}