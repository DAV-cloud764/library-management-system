import { useState } from "react";
import { InputGroup, Form, Button } from "react-bootstrap";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleClear = () => {
    setKeyword("");
    onSearch("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <InputGroup className="mb-4">
      <Form.Control
        type="text"
        placeholder="Search by book title..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <Button
        variant="primary"
        onClick={handleSearch}
      >
        <FaSearch />
      </Button>

      <Button
        variant="outline-secondary"
        onClick={handleClear}
      >
        <FaTimes />
      </Button>
    </InputGroup>
  );
};

export default SearchBar;