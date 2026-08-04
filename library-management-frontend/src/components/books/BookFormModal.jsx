import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import BookForm from "./BookForm";

const initialFormData = {
  title: "",
  author: "",
  isbn: "",
  category: "",
  publisher: "",
  publicationYear: "",
  quantity: 1,
  availableQuantity: 1,
};

const BookFormModal = ({ show, onHide, onSave, book }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        isbn: book.isbn || "",
        category: book.category || "",
        publisher: book.publisher || "",
        publicationYear: book.publicationYear || "",
        quantity: book.quantity || 1,
        availableQuantity: book.availableQuantity || 1,
      });
    } else {
      setFormData(initialFormData);
    }

    setErrors({});
  }, [book, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "publicationYear" ||
        name === "quantity" ||
        name === "availableQuantity"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const validate = () => {
    const validationErrors = {};

    if (!formData.title.trim())
      validationErrors.title = "Title is required.";

    if (!formData.author.trim())
      validationErrors.author = "Author is required.";

    if (!formData.isbn.trim())
      validationErrors.isbn = "ISBN is required.";

    if (!formData.category.trim())
      validationErrors.category = "Category is required.";

    if (!formData.quantity || formData.quantity < 1)
      validationErrors.quantity = "Quantity must be at least 1.";

    if (
      formData.availableQuantity < 0 ||
      formData.availableQuantity > formData.quantity
    ) {
      validationErrors.availableQuantity =
        "Available quantity cannot exceed total quantity.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSave(formData);

    setFormData(initialFormData);
    setErrors({});
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {book ? "Edit Book" : "Add New Book"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <BookForm
          formData={formData}
          errors={errors}
          onChange={handleChange}
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
          {book ? "Update Book" : "Save Book"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookFormModal;