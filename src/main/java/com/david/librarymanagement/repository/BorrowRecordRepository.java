package com.david.librarymanagement.repository;

import com.david.librarymanagement.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

import java.util.List;

public interface BorrowRecordRepository
        extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByReturnedFalse();
    List<BorrowRecord> findByReturnedFalseAndDueDateBefore(LocalDate today);
    List<BorrowRecord> findTop5ByOrderByBorrowDateDesc();

}