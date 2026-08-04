package com.david.librarymanagement.service;

import com.david.librarymanagement.dto.BookDTO;
import com.david.librarymanagement.entity.Book;
import com.david.librarymanagement.exception.BookNotFoundException;
import com.david.librarymanagement.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /* -----------------------------
       DTO Mapper
     ----------------------------- */

    private BookDTO convertToDTO(Book book) {

        return new BookDTO(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getIsbn(),
                book.getCategory(),
                book.getPublisher(),
                book.getPublicationYear(),
                book.getQuantity(),
                book.getAvailableQuantity()
        );
    }

    /* -----------------------------
       Create Book
     ----------------------------- */

    public BookDTO saveBook(Book book) {

        if (book.getQuantity() < 1) {
            throw new IllegalArgumentException("Quantity must be at least 1.");
        }

        if (book.getAvailableQuantity() > book.getQuantity()) {
            throw new IllegalArgumentException(
                    "Available copies cannot exceed total quantity."
            );
        }

        Book savedBook = bookRepository.save(book);

        return convertToDTO(savedBook);
    }

    /* -----------------------------
       Read All Books
     ----------------------------- */

    public List<BookDTO> getAllBookDTOs() {

        return bookRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /* -----------------------------
       Pagination
     ----------------------------- */

    public Page<BookDTO> getBooks(Pageable pageable) {

        return bookRepository.findAll(pageable)
                .map(this::convertToDTO);
    }

    /* -----------------------------
       Search
     ----------------------------- */

    public List<BookDTO> searchBookDTOs(String title) {

        return bookRepository.findByTitleContainingIgnoreCase(title)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /* -----------------------------
       Update
     ----------------------------- */

    public BookDTO updateBook(Long id, Book updatedBook) {

        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() ->
                        new BookNotFoundException("Book not found."));

        existingBook.setTitle(updatedBook.getTitle());
        existingBook.setAuthor(updatedBook.getAuthor());
        existingBook.setIsbn(updatedBook.getIsbn());
        existingBook.setCategory(updatedBook.getCategory());
        existingBook.setPublisher(updatedBook.getPublisher());
        existingBook.setPublicationYear(updatedBook.getPublicationYear());
        existingBook.setQuantity(updatedBook.getQuantity());
        existingBook.setAvailableQuantity(updatedBook.getAvailableQuantity());

        Book savedBook = bookRepository.save(existingBook);

        return convertToDTO(savedBook);
    }

    /* -----------------------------
       Delete
     ----------------------------- */

    public void deleteBook(Long id) {

        if (!bookRepository.existsById(id)) {
            throw new BookNotFoundException("Book not found.");
        }

        bookRepository.deleteById(id);
    }
}