import { Modal } from "react-bootstrap";
import BorrowForm from "./BorrowForm";

const BorrowFormModal = ({
  show,
  handleClose,
  members,
  books,
  onBorrow,
}) => {

  return (

    <Modal
      show={show}
      onHide={handleClose}
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>

          Borrow Book

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <BorrowForm
          members={members}
          books={books}
          onBorrow={onBorrow}
        />

      </Modal.Body>

    </Modal>

  );

};

export default BorrowFormModal;