import { Table, Card } from "react-bootstrap";
import StudentRow from "./StudentRow";

const StudentTable = ({ members, onEdit, onDelete }) => {
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
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Registration Date</th>
              <th style={{ width: "170px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>

            {!members || members.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center text-muted py-5"
                >
                  No members found.
                </td>
              </tr>

            ) : (

              members.map((member, index) => (
                <StudentRow
                  key={member.id}
                  index={index}
                  member={member}
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

export default StudentTable;