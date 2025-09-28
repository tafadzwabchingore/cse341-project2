const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
  genre: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  pages: { type: Number, required: true },
  price: { type: Number, required: true },
  inStock: { type: Boolean, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Book", bookSchema);