import { Modal, Button } from "react-bootstrap";

const DeleteStudentModal = ({
  show,
  onHide,
  onConfirm,
  member,
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >

      <Modal.Header closeButton>
        <Modal.Title>
          Delete Student
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>

        Are you sure you want to delete

        <strong>
          {" "}
          {member?.fullName}
        </strong>

        ?

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

export default DeleteStudentModal;