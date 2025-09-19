const Author = require("../models/Author");

// GET /api/authors
exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ name: 1 });
    res.json(authors);
  } catch (err) {
    next(err);
  }
};

// POST /api/authors
exports.createAuthor = async (req, res, next) => {
  try {
    const { name, bio, birthdate, nationality, website } = req.body;
    // Validate required fields
    if (!name || !bio || !birthdate || !nationality || !website) {
      return res.status(400).json({ error: "All fields (name, bio, birthdate, nationality, website) are required." });
    }
    const author = await Author.create({ name, bio, birthdate, nationality, website });
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
};

// PUT /api/authors/:id  (full replace)
exports.updateAuthor = async (req, res, next) => {
  try {
    const { name, bio, birthdate, nationality, website } = req.body;
    if (!name || !bio || !birthdate || !nationality || !website) {
      return res.status(400).json({ error: "All fields (name, bio, birthdate, nationality, website) are required for full replacement." });
    }

    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name, bio, birthdate, nationality, website },
      { new: true, runValidators: true, overwrite: true }
    );

    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (err) {
    next(err);
  }
};

// DELETE /api/authors/:id
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ error: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (err) {
    next(err);
  }
};