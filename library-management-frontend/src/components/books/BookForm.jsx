import { Form, Row, Col } from "react-bootstrap";

const BookForm = ({
  formData,
  errors,
  onChange,
}) => {
  return (
    <Form>

      <Row>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Title</Form.Label>

            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={onChange}
              isInvalid={!!errors.title}
            />

            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Author</Form.Label>

            <Form.Control
              type="text"
              name="author"
              value={formData.author}
              onChange={onChange}
              isInvalid={!!errors.author}
            />

            <Form.Control.Feedback type="invalid">
              {errors.author}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

      </Row>

      <Row>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>ISBN</Form.Label>

            <Form.Control
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={onChange}
              isInvalid={!!errors.isbn}
            />

            <Form.Control.Feedback type="invalid">
              {errors.isbn}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Category</Form.Label>

            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={onChange}
              isInvalid={!!errors.category}
            />

            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

      </Row>

      <Row>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Publisher</Form.Label>

            <Form.Control
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={onChange}
            />

          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Publication Year</Form.Label>

            <Form.Control
              type="number"
              name="publicationYear"
              value={formData.publicationYear}
              onChange={onChange}
            />

          </Form.Group>
        </Col>

      </Row>

      <Row>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Quantity</Form.Label>

            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={onChange}
              isInvalid={!!errors.quantity}
            />

            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

        <Col md={6} className="mb-3">
          <Form.Group>
            <Form.Label>Available Quantity</Form.Label>

            <Form.Control
              type="number"
              name="availableQuantity"
              value={formData.availableQuantity}
              onChange={onChange}
              isInvalid={!!errors.availableQuantity}
            />

            <Form.Control.Feedback type="invalid">
              {errors.availableQuantity}
            </Form.Control.Feedback>

          </Form.Group>
        </Col>

      </Row>

    </Form>
  );
};

export default BookForm;