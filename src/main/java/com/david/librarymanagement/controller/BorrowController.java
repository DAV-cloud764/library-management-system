package com.david.librarymanagement.controller;

import com.david.librarymanagement.dto.BorrowRequestDTO;
import com.david.librarymanagement.entity.BorrowRecord;
import com.david.librarymanagement.service.BorrowService;
import org.springframework.web.bind.annotation.*;
import com.david.librarymanagement.dto.ReturnBookRequestDTO;
import com.david.librarymanagement.dto.BorrowHistoryDTO;
import com.david.librarymanagement.dto.OverdueBookDTO;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;

import java.util.List;

@RestController
@RequestMapping("/api/borrow")
@SecurityRequirement(name = "Bearer Authentication")
public class BorrowController {

    private final BorrowService borrowService;

    public BorrowController(BorrowService borrowService) {
        this.borrowService = borrowService;
    }

    @PostMapping
    public BorrowRecord borrowBook(
            @RequestBody BorrowRequestDTO request) {

        return borrowService.borrowBook(request);
    }

    @PostMapping("/return")
    public BorrowRecord returnBook(
            @RequestBody ReturnBookRequestDTO request) {

        return borrowService.returnBook(request);
    }

    @GetMapping("/history")
    public List<BorrowHistoryDTO> getBorrowHistory() {

        return borrowService.getBorrowHistory();
    }

    @GetMapping("/current")
    public List<BorrowHistoryDTO> getCurrentBorrowedBooks() {

        return borrowService.getCurrentBorrowedBooks();
    }

    @GetMapping("/overdue")
    public List<OverdueBookDTO> getOverdueBooks() {

        return borrowService.getOverdueBooks();
    }
}