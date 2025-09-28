const { validationResult } = require("express-validator");
const Book = require("../models/Book");

// -------------------
// @desc    Get all books
// @route   GET /api/books
// @access  Public
// -------------------
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("authorId", "name");
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Get book by ID
// @route   GET /api/books/:id
// @access  Public
// -------------------
exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("authorId", "name");
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Create new book
// @route   POST /api/books
// @access  Private/Admin
// -------------------
exports.createBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, authorId, publishedYear, genre } = req.body;

    const book = await Book.create({
      title,
      authorId,
      publishedYear,
      genre,
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Update book
// @route   PUT /api/books/:id
// @access  Private/Admin
// -------------------
exports.updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Delete book
// @route   DELETE /api/books/:id
// @access  Private/Admin
// -------------------
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};