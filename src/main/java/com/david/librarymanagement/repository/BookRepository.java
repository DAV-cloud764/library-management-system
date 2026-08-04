package com.david.librarymanagement.repository;

import com.david.librarymanagement.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByTitleContainingIgnoreCase(String title);

    Page<Book> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

    @Query("""
SELECT COALESCE(SUM(b.availableQuantity), 0)
FROM Book b
""")
    Long getTotalAvailableBooks();

    @Query("""
SELECT COALESCE(SUM(b.quantity), 0)
FROM Book b
""")
    Long getTotalBookCopies();
}