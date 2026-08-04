import { Button, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const StudentRow = ({ index, member, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>

      <td>{member.fullName}</td>

      <td>{member.email}</td>

      <td>{member.phoneNumber}</td>

      <td>{member.address}</td>

      <td>{member.registrationDate}</td>

      <td>
        <ButtonGroup>

          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(member)}
          >
            <FaEdit className="me-1" />
            Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(member)}
          >
            <FaTrash className="me-1" />
            Delete
          </Button>

        </ButtonGroup>
      </td>

    </tr>
  );
};

export default StudentRow;