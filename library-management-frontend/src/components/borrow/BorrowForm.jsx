import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const BorrowForm = ({
  members,
  books,
  onBorrow,
}) => {

  const [formData, setFormData] = useState({
    memberId: "",
    bookId: "",
  });

  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const form = e.currentTarget;

    if (!form.checkValidity()) {

      e.stopPropagation();

      setValidated(true);

      return;

    }

    try {

      await onBorrow({
        memberId: Number(formData.memberId),
        bookId: Number(formData.bookId),
      });

      setFormData({
        memberId: "",
        bookId: "",
      });

      setValidated(false);

    } catch (err) {

      console.error(err);

    }

  };

  return (

    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
    >

      <Row>

        <Col md={12} className="mb-3">

          <Form.Group>

            <Form.Label>

              Student

            </Form.Label>

            <Form.Select
              required
              name="memberId"
              value={formData.memberId}
              onChange={handleChange}
            >

              <option value="">

                -- Select Student --

              </option>

              {members.map((member) => (

                <option
                  key={member.id}
                  value={member.id}
                >

                  {member.fullName}

                </option>

              ))}

            </Form.Select>

            <Form.Control.Feedback type="invalid">

              Please select a student.

            </Form.Control.Feedback>

          </Form.Group>

        </Col>

        <Col md={12} className="mb-4">

          <Form.Group>

            <Form.Label>

              Book

            </Form.Label>

            <Form.Select
              required
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
            >

              <option value="">

                -- Select Book --

              </option>

              {books.map((book) => (

                <option
                  key={book.id}
                  value={book.id}
                >

                  {book.title} ({book.availableQuantity} available)

                </option>

              ))}

            </Form.Select>

            <Form.Control.Feedback type="invalid">

              Please select a book.

            </Form.Control.Feedback>

          </Form.Group>

        </Col>

      </Row>

      <div className="d-flex justify-content-end">

        <Button
          variant="primary"
          type="submit"
        >

          Borrow Book

        </Button>

      </div>

    </Form>

  );

};

export default BorrowForm;