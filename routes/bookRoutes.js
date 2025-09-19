const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Author = require('../models/Author');

// GET all books
router.get('/', async (req, res, next) => {
  try {
    const books = await Book.find(req.params.id);
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// GET book by id
router.get('/:id', async (req, res, next) => {
  try {
    const books = await Book.findById(req.params.id);
    if (!books) return res.status(404).json({ error: 'Book not found' });
    res.json(books);
  } catch (err) {
    next(err);
  }
});

// POST new books
router.post('/', async (req, res, next) => {
  try {
    const { title, author, genre, publishedDate, pages, price, inStock, description } = req.body;

    if (!title || !author || !genre || !publishedDate || !pages || !price || !inStock || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) return res.status(400).json({ error: 'Author not found' });

    const newBook = new Book({ title, author, genre, publishedDate, pages, price, inStock, description });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
});

// PUT update book
router.put('/:id', async (req, res, next) => {
  try {
    const { title, author, genre, publishedDate, pages, price, inStock, description } = req.body;

    if (!title || !author || !genre || !publishedDate || !pages || !price || !inStock || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const authorExists = await Author.findById(author);
    if (!authorExists) return res.status(400).json({ error: 'Author not found' });

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, publishedDate, pages, price, inStock, description },
      { new: true }
    );

    if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
    res.json(updatedBook);
  } catch (err) {
    next(err);
  }
});

// DELETE book
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;