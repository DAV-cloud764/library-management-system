import { Pagination } from "react-bootstrap";

const BookPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const items = [];

  for (let i = 0; i < totalPages; i++) {
    items.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => onPageChange(i)}
      >
        {i + 1}
      </Pagination.Item>
    );
  }

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.First
        disabled={currentPage === 0}
        onClick={() => onPageChange(0)}
      />

      <Pagination.Prev
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
      />

      {items}

      <Pagination.Next
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
      />

      <Pagination.Last
        disabled={currentPage === totalPages - 1}
        onClick={() => onPageChange(totalPages - 1)}
      />
    </Pagination>
  );
};

export default BookPagination;