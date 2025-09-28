const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const { protect, authorize } = require("../middleware/authMiddleware");

// -------------------
// Public routes
// -------------------
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// -------------------
// Protected routes (Admin only)
// -------------------

// Create book
router.post(
  "/",
  protect,
  authorize("admin"),
  [
    body("title")
      .notEmpty()
      .withMessage("Title is required"),
    body("authorId")
      .notEmpty()
      .withMessage("Author ID is required")
      .isMongoId()
      .withMessage("Author ID must be a valid Mongo ID"),
    body("publishedYear")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Published year must be a valid number"),
    body("genre")
      .optional()
      .isString()
      .withMessage("Genre must be a string"),
  ],
  createBook
);

// Update book
router.put(
  "/:id",
  protect,
  authorize("admin"),
  [
    body("title")
      .optional()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("authorId")
      .optional()
      .isMongoId()
      .withMessage("Author ID must be a valid Mongo ID"),
    body("publishedYear")
      .optional()
      .isInt({ min: 0 })
      .withMessage("Published year must be a valid number"),
    body("genre")
      .optional()
      .isString()
      .withMessage("Genre must be a string"),
  ],
  updateBook
);

// Delete book
router.delete("/:id", protect, authorize("admin"), deleteBook);

module.exports = router;