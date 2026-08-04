import api from "./api";

const bookService = {

    // Get all books (small datasets)
    getAllBooks: async () => {
        const { data } = await api.get("/books");
        return data;
    },

    // Server-side pagination
    // Server-side pagination
getBooksPage: async (page = 0, size = 10) => {
    const { data } = await api.get("/books/page", {
        params: {
            page,
            size,
        },
    });

    return data;
},

    // Search books
    searchBooks: async (title) => {
        const { data } = await api.get("/books/search", {
            params: {
                title,
            },
        });

        return data;
    },

    // Add a new book
    addBook: async (book) => {
        const { data } = await api.post("/books", book);
        return data;
    },

    // Update a book
    updateBook: async (id, book) => {
        const { data } = await api.put(`/books/${id}`, book);
        return data;
    },

    // Delete a book
    deleteBook: async (id) => {
        const { data } = await api.delete(`/books/${id}`);
        return data;
    },

    // Get one book by ID (recommended)
    getBookById: async (id) => {
        const { data } = await api.get(`/books/${id}`);
        return data;
    },

};

export default bookService;