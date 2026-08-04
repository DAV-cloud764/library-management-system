import { Modal, Button } from "react-bootstrap";

const DeleteBookModal = ({
  show,
  onHide,
  onConfirm,
  book,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {book ? (
          <>
            <p>
              Are you sure you want to delete this book?
            </p>

            <div className="border rounded p-3 bg-light">
              <strong>Title:</strong> {book.title}
              <br />
              <strong>Author:</strong> {book.author}
              <br />
              <strong>ISBN:</strong> {book.isbn}
            </div>

            <p className="text-danger mt-3 mb-0">
              This action cannot be undone.
            </p>
          </>
        ) : (
          <p>No book selected.</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteBookModal;