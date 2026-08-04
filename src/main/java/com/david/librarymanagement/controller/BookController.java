package com.david.librarymanagement.controller;

import com.david.librarymanagement.dto.BookDTO;
import com.david.librarymanagement.entity.Book;
import com.david.librarymanagement.service.BookService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@SecurityRequirement(name = "Bearer Authentication")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * Create a new book
     */
    @PostMapping
    public BookDTO addBook(@Valid @RequestBody Book book) {
        return bookService.saveBook(book);
    }

    /**
     * Get all books
     */
    @GetMapping
    public List<BookDTO> getAllBooks() {
        return bookService.getAllBookDTOs();
    }

    /**
     * Get paginated books
     */
    @GetMapping("/page")
    public Page<BookDTO> getBooks(Pageable pageable) {
        return bookService.getBooks(pageable);
    }

    /**
     * Search books by title
     */
    @GetMapping("/search")
    public List<BookDTO> searchBooks(@RequestParam String title) {
        return bookService.searchBookDTOs(title);
    }

    /**
     * Update book
     */
    @PutMapping("/{id}")
    public BookDTO updateBook(
            @PathVariable Long id,
            @Valid @RequestBody Book book) {

        return bookService.updateBook(id, book);
    }

    /**
     * Delete book
     */
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {

        bookService.deleteBook(id);

        return "Book deleted successfully.";
    }
}