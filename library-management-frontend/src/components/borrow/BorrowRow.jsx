import { Badge, Button } from "react-bootstrap";

const BorrowRow = ({ borrow, index, onReturn }) => {

  const handleReturn = () => {

    if (window.confirm("Are you sure you want to return this book?")) {
      onReturn(borrow.borrowId);
    }

  };

  return (

    <tr>

      <td>{index + 1}</td>

      <td>{borrow.memberName}</td>

      <td>{borrow.bookTitle}</td>

      <td>{borrow.borrowDate}</td>

      <td>{borrow.dueDate}</td>

      <td>

        {borrow.returned ? (

          <Badge bg="success">
            Returned
          </Badge>

        ) : (

          <Badge bg="warning" text="dark">
            Borrowed
          </Badge>

        )}

      </td>

      <td>

        {!borrow.returned ? (

          <Button
            variant="success"
            size="sm"
            onClick={handleReturn}
          >
            Return
          </Button>

        ) : (

          <span className="text-muted">
            —
          </span>

        )}

      </td>

    </tr>

  );

};

export default BorrowRow;