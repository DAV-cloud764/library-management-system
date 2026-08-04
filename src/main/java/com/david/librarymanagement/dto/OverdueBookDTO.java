package com.david.librarymanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OverdueBookDTO {

    private Long borrowId;

    private String memberName;

    private String bookTitle;

    private LocalDate dueDate;

    private long daysLate;
}