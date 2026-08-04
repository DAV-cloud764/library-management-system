import { useState } from "react";
import { Container, Row, Col, Button, Alert, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

import useMembers from "../../hooks/useMembers";

import StudentTable from "../../components/students/StudentTable";
import StudentFormModal from "../../components/students/StudentFormModal";
import DeleteStudentModal from "../../components/students/DeleteStudentModal";

const Students = () => {
  const {
    members,
    loading,
    error,
    addMember,
    updateMember,
    deleteMember,
  } = useMembers();

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleAddMember = () => {
    setSelectedMember(null);
    setShowFormModal(true);
  };

  const handleEditMember = (member) => {
    setSelectedMember(member);
    setShowFormModal(true);
  };

  const handleDeleteMember = (member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  };

  const handleSaveMember = async (member) => {
    try {
      if (selectedMember) {
        await updateMember(selectedMember.id, member);
      } else {
        await addMember(member);
      }

      setShowFormModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteMember(selectedMember.id);

      setShowDeleteModal(false);
      setSelectedMember(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid>

      <Row className="mb-4 align-items-center">

        <Col>
          <h2 className="fw-bold">Students</h2>
          <p className="text-muted">
            Manage registered library members.
          </p>
        </Col>

        <Col xs="auto">
          <Button onClick={handleAddMember}>
            <FaPlus className="me-2" />
            Add Student
          </Button>
        </Col>

      </Row>

      {error && (
        <Alert variant="danger">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center mt-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <StudentTable
          members={members}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
        />
      )}

      <StudentFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSave={handleSaveMember}
        member={selectedMember}
      />

      <DeleteStudentModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        member={selectedMember}
      />

    </Container>
  );
};

export default Students;