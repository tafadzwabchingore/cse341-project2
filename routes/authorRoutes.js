const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

const {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

const { protect, authorize } = require("../middleware/authMiddleware");

// Middleware to handle validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validation rules for creating/updating an author
const authorValidationRules = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("bio")
    .optional()
    .isLength({ max: 500 })
    .withMessage("Bio must not exceed 500 characters"),
];

// Public routes
router.get("/", getAuthors);
router.get("/:id", getAuthorById);

// Protected + admin-only routes
router.post(
  "/",
  protect,
  authorize("admin"),
  authorValidationRules,
  validate,
  createAuthor
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  authorValidationRules,
  validate,
  updateAuthor
);

router.delete("/:id", protect, authorize("admin"), deleteAuthor);

module.exports = router;