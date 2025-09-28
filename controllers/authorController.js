const { validationResult } = require("express-validator");
const Author = require("../models/Author");

// -------------------
// @desc    Get all authors
// @route   GET /api/authors
// @access  Public
// -------------------
exports.getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Get author by ID
// @route   GET /api/authors/:id
// @access  Public
// -------------------
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Create new author
// @route   POST /api/authors
// @access  Private/Admin
// -------------------
exports.createAuthor = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, bio } = req.body;

    const author = await Author.create({ name, bio });
    res.status(201).json(author);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Update author
// @route   PUT /api/authors/:id
// @access  Private/Admin
// -------------------
exports.updateAuthor = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json(author);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// -------------------
// @desc    Delete author
// @route   DELETE /api/authors/:id
// @access  Private/Admin
// -------------------
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};