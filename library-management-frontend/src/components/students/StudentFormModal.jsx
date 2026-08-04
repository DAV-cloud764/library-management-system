import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import StudentForm from "./StudentForm";

const StudentFormModal = ({
  show,
  onHide,
  onSave,
  member,
}) => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  useEffect(() => {

    if (member) {
      setFormData({
        fullName: member.fullName || "",
        email: member.email || "",
        phoneNumber: member.phoneNumber || "",
        address: member.address || "",
      });

    } else {

      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        address: "",
      });

    }

  }, [member, show]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await onSave(formData);
  };

  return (

    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >

      <Modal.Header closeButton>

        <Modal.Title>

          {member ? "Edit Student" : "Add New Student"}

        </Modal.Title>

      </Modal.Header>

      <Modal.Body>

        <StudentForm
          formData={formData}
          handleChange={handleChange}
        />

      </Modal.Body>

      <Modal.Footer>

        <Button
          variant="secondary"
          onClick={onHide}
        >
          Cancel
        </Button>

        <Button
    variant="primary"
    onClick={handleSubmit}
>
    {member ? "Update Student" : "Save Student"}
</Button>

      </Modal.Footer>

    </Modal>
  );
};

export default StudentFormModal;