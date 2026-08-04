import { Card, Spinner, Table } from "react-bootstrap";
import BorrowRow from "./BorrowRow";

const BorrowTable = ({
  borrowedBooks,
  loading,
  onReturn,
}) => {

  if (loading) {
    return (
      <Card className="shadow-sm border-0">
        <Card.Body className="text-center py-5">
          <Spinner animation="border" />
          <div className="mt-3">
            Loading borrowed books...
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-0">

      <Card.Body>

        <Table
          responsive
          hover
          striped
          bordered
          className="align-middle mb-0"
        >

          <thead className="table-dark">

            <tr>

              <th style={{ width: "60px" }}>#</th>

              <th>Student</th>

              <th>Book</th>

              <th>Borrow Date</th>

              <th>Due Date</th>

              <th>Status</th>

              <th style={{ width: "120px" }}>Action</th>

            </tr>

          </thead>

          <tbody>

            {borrowedBooks.length === 0 ? (

              <tr>

                <td
                  colSpan="7"
                  className="text-center py-5 text-muted"
                >

                  No borrowed books found.

                </td>

              </tr>

            ) : (

              borrowedBooks.map((borrow, index) => (

                <BorrowRow
                  key={borrow.borrowId}
                  borrow={borrow}
                  index={index}
                  onReturn={onReturn}
                />

              ))

            )}

          </tbody>

        </Table>

      </Card.Body>

    </Card>
  );
};

export default BorrowTable;