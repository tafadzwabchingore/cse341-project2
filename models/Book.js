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

bookSchema.set("toJSON", {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model("Book", bookSchema);