import { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
} from "react-bootstrap";

import useBorrow from "../../hooks/useBorrow";
import useBooks from "../../hooks/useBooks";
import useMembers from "../../hooks/useMembers";

import BorrowTable from "../../components/borrow/BorrowTable";
import BorrowFormModal from "../../components/borrow/BorrowFormModal";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

const Borrow = () => {

  const { books } = useBooks();

  const { members } = useMembers();

  const {
    borrowedBooks,
    borrowBook,
    returnBook,
    loading,
    error,
  } = useBorrow();

  const [showModal, setShowModal] = useState(false);

  const availableBooks = books.filter(
    (book) => book.availableQuantity > 0
  );

  const handleBorrow = async (borrowRequest) => {

    try {

      await borrowBook(borrowRequest);

      showSuccess("Book borrowed successfully.");

      setShowModal(false);

    } catch (err) {

      console.error(err);

      showError(
        err.response?.data?.message ||
        "Failed to borrow book."
      );

    }

  };

  const handleReturn = async (borrowRecordId) => {

    try {

      await returnBook(borrowRecordId);

      showSuccess("Book returned successfully.");

    } catch (err) {

      console.error(err);

      showError(
        err.response?.data?.message ||
        "Failed to return book."
      );

    }

  };

  return (

    <Container fluid className="mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

          <h2 className="fw-bold mb-1">
            Borrow Management
          </h2>

          <p className="text-muted mb-0">
            Manage book borrowing and returns.
          </p>

        </div>

        <Button
          variant="primary"
          onClick={() => setShowModal(true)}
          disabled={availableBooks.length === 0}
        >
          Borrow Book
        </Button>

      </div>

      {error && (

        <Alert variant="danger">

          {error}

        </Alert>

      )}

      <Card className="shadow-sm border-0">

        <Card.Body>

          <BorrowTable
            borrowedBooks={borrowedBooks}
            loading={loading}
            onReturn={handleReturn}
          />

        </Card.Body>

      </Card>

      <BorrowFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        members={members}
        books={availableBooks}
        onBorrow={handleBorrow}
      />

    </Container>

  );

};

export default Borrow;