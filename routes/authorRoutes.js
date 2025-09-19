const express = require('express');
const router = express.Router();
const Author = require('../models/Author');

// GET all authors
router.get('/', async (req, res, next) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    next(err);
  }
});

// GET author by id
router.get('/:id', async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ error: 'Author not found' });
    res.json(author);
  } catch (err) {
    next(err);
  }
});

// POST new author
router.post('/', async (req, res, next) => {
  try {
    const { name, bio, birthdate, nationality, website } = req.body;

    // Validation
    if (!name || !bio || !birthdate || !nationality || !website) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newAuthor = new Author({ name, bio, birthdate, nationality, website });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    next(err);
  }
});

// PUT update author
router.put('/:id', async (req, res, next) => {
  try {
    const { name, bio, birthdate, nationality, website } = req.body;

    // Validation
    if (!name || !bio || !birthdate || !nationality || !website) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio, birthdate, nationality, website },
      { new: true }
    );

    if (!updatedAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json(updatedAuthor);
  } catch (err) {
    next(err);
  }
});

// DELETE author
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
    if (!deletedAuthor) return res.status(404).json({ error: 'Author not found' });
    res.json({ message: 'Author deleted successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;