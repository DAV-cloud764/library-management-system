import { useState, useEffect } from "react";
import bookService from "../services/bookService";

const PAGE_SIZE = 10;

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const loadBooks = async (pageNumber = 0) => {
    try {
      setLoading(true);
      setError("");

      const data = await bookService.getBooksPage(
    pageNumber,
    PAGE_SIZE
);

      setBooks(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const fetchData = async () => {
    await loadBooks();
  };

  fetchData();
}, []);

  const searchBooks = async (title) => {
    try {
      setLoading(true);
      setError("");
      setSearchTerm(title);

      if (!title.trim()) {
        await loadBooks();
        return;
      }

      const data = await bookService.searchBooks(title);

      setBooks(data);
      setPage(0);
      setTotalPages(1);
    } catch (err) {
      console.error(err);
      setError("Failed to search books.");
    } finally {
      setLoading(false);
    }
  };

  const addBook = async (book) => {
    await bookService.addBook(book);

    if (searchTerm) {
      await searchBooks(searchTerm);
    } else {
      await loadBooks(page);
    }
  };

  const updateBook = async (id, book) => {
    await bookService.updateBook(id, book);

    if (searchTerm) {
      await searchBooks(searchTerm);
    } else {
      await loadBooks(page);
    }
  };

  const deleteBook = async (id) => {
    await bookService.deleteBook(id);

    if (searchTerm) {
      await searchBooks(searchTerm);
    } else {
      await loadBooks(page);
    }
  };

  return {
    books,
    page,
    totalPages,
    loading,
    error,

    loadBooks,
    searchBooks,

    addBook,
    updateBook,
    deleteBook,
  };
};

export default useBooks;