import { Table, Card } from "react-bootstrap";
import BookRow from "./BookRow";

const BookTable = ({ books, onEdit, onDelete }) => {
  return (
    <Card className="shadow-sm border-0 mt-4">
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
              <th style={{ width: "70px" }}>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th style={{ width: "170px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {!books || books.length === 0 ? (

              <tr>
                <td
                  colSpan="5"
                  className="text-center text-muted py-5"
                >
                  No books found.
                </td>
              </tr>

            ) : (

              books.map((book, index) => (
                <BookRow
                  key={book.id}
                  index={index}
                  book={book}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))

            )}

          </tbody>

        </Table>

      </Card.Body>
    </Card>
  );
};

export default BookTable;