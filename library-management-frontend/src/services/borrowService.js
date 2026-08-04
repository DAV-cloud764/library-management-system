import api from "./api";

const borrowService = {

  // ============================
  // Borrow a Book
  // ============================
  async borrowBook(borrowRequest) {
    const { data } = await api.post("/borrow", borrowRequest);
    return data;
  },

  // ============================
  // Return a Book
  // ============================
  async returnBook(borrowRecordId) {
    const { data } = await api.post("/borrow/return", {
      borrowRecordId,
    });
    return data;
  },

  // ============================
  // Current Borrowed Books
  // ============================
  async getCurrentBorrowedBooks() {
    const { data } = await api.get("/borrow/current");
    return data;
  },

  // ============================
  // Borrow History
  // ============================
  async getBorrowHistory() {
    const { data } = await api.get("/borrow/history");
    return data;
  },

  // ============================
  // Overdue Books
  // ============================
  async getOverdueBooks() {
    const { data } = await api.get("/borrow/overdue");
    return data;
  },

  // ============================
  // Get Borrow Record by ID
  // ============================
  async getBorrowRecordById(id) {
    const { data } = await api.get(`/borrow/${id}`);
    return data;
  },

  // ============================
  // Search Borrow Records
  // ============================
  async searchBorrowRecords(keyword) {
    const { data } = await api.get(`/borrow/search`, {
      params: { keyword },
    });
    return data;
  },

  // ============================
  // Renew Borrowed Book
  // ============================
  async renewBorrow(borrowRecordId) {
    const { data } = await api.put(`/borrow/renew/${borrowRecordId}`);
    return data;
  },

};

export default borrowService;