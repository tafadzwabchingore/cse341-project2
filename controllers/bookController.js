const Book = require("../models/Book");
const Author = require("../models/Author");

// GET all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find(req.params.id);
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET a single book by ID
exports.getBookById = async (req, res) => {
  try {
    //const books = await Book.findById(req.params.id).populate("author", "name");
    const books = await Book.findById(req.params.id);
    if (!books) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// CREATE a new book
exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedDate,
      pages,
      price, 
      inStock, 
      description,
    } = req.body;

    // Validate required fields strictly
    const requiredFields = { title, author, genre, publishedDate, pages, price, inStock, description };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        return res.status(400).json({ error: `${key} is required` });
      }
    }

    const newBook = new Book({
      title,
      author,
      genre,
      publishedDate,
      pages,
      price, 
      inStock, 
      description,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// UPDATE an existing book
exports.updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      publishedDate,
      pages,
      price, 
      inStock, 
      description,
    } = req.body;

    // Strict validation to allow false/0 values
    const requiredFields = { title, author, genre, publishedDate, pages, price, inStock, description };
    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === undefined || value === null || value === "") {
        return res.status(400).json({ error: `${key} is required` });
      }
    }

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedDate, pages, price, inStock, description },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};