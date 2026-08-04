import { useEffect, useState } from "react";
import borrowService from "../services/borrowService";

const useBorrow = () => {

  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [overdueBooks, setOverdueBooks] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadBorrowedBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await borrowService.getCurrentBorrowedBooks();
      setBorrowedBooks(data);

    } catch (err) {
      console.error(err);
      setError("Failed to load borrowed books.");
    } finally {
      setLoading(false);
    }
  };

  const loadBorrowHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await borrowService.getBorrowHistory();
      setBorrowHistory(data);

    } catch (err) {
      console.error(err);
      setError("Failed to load borrow history.");
    } finally {
      setLoading(false);
    }
  };

  const loadOverdueBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await borrowService.getOverdueBooks();
      setOverdueBooks(data);

    } catch (err) {
      console.error(err);
      setError("Failed to load overdue books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  const borrowBook = async (borrowRequest) => {
    await borrowService.borrowBook(borrowRequest);
    await loadBorrowedBooks();
  };

  const returnBook = async (borrowRecordId) => {
    await borrowService.returnBook(borrowRecordId);
    await loadBorrowedBooks();
  };

  return {
    borrowedBooks,
    borrowHistory,
    overdueBooks,

    loading,
    error,

    loadBorrowedBooks,
    loadBorrowHistory,
    loadOverdueBooks,

    borrowBook,
    returnBook,
  };

};

export default useBorrow;