import { Button, ButtonGroup } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";

const BookRow = ({ index, book, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{index + 1}</td>

      <td>{book.title}</td>

      <td>{book.author}</td>

      <td>{book.category}</td>

      <td>
        <ButtonGroup>

          <Button
            variant="warning"
            size="sm"
            onClick={() => onEdit(book)}
          >
            <FaEdit className="me-1" />
            Edit
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(book)}
          >
            <FaTrash className="me-1" />
            Delete
          </Button>

        </ButtonGroup>
      </td>
    </tr>
  );
};

export default BookRow;