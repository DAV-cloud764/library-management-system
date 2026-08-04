import { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import useBooks from "../../hooks/useBooks";

import SearchBar from "../../components/books/SearchBar";
import BookTable from "../../components/books/BookTable";
import BookFormModal from "../../components/books/BookFormModal";
import DeleteBookModal from "../../components/books/DeleteBookModal";
import Pagination from "../../components/books/Pagination";

const Books = () => {
  const {
    books,
    page,
    totalPages,
    loading,
    error,
    searchBooks,
    addBook,
    updateBook,
    deleteBook,
    loadBooks,
  } = useBooks();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleAddBook = () => {
    setSelectedBook(null);
    setShowFormModal(true);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowFormModal(true);
  };

  const handleDeleteBook = (book) => {
    setSelectedBook(book);
    setShowDeleteModal(true);
  };

  const handleSaveBook = async (book) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, book);
      } else {
        await addBook(book);
      }

      setShowFormModal(false);
      setSelectedBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      if (!selectedBook) return;

      await deleteBook(selectedBook.id);

      setShowDeleteModal(false);
      setSelectedBook(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="fw-bold">Books</h2>
          <p className="text-muted">
            Manage the library book collection.
          </p>
        </Col>

        <Col xs="auto">
          <Button onClick={handleAddBook}>
            <FaPlus className="me-2" />
            Add Book
          </Button>
        </Col>
      </Row>

      <SearchBar onSearch={searchBooks} />

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <BookTable
            books={books}
            onEdit={handleEditBook}
            onDelete={handleDeleteBook}
          />

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={loadBooks}
          />
        </>
      )}

      <BookFormModal
        show={showFormModal}
        onHide={() => {
          setShowFormModal(false);
          setSelectedBook(null);
        }}
        onSave={handleSaveBook}
        book={selectedBook}
      />

      <DeleteBookModal
        show={showDeleteModal}
        onHide={() => {
          setShowDeleteModal(false);
          setSelectedBook(null);
        }}
        onConfirm={confirmDelete}
        book={selectedBook}
      />
    </Container>
  );
};

export default Books;