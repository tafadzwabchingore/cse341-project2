const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String, required: true },
  birthdate: { type: Date, required: true },
  nationality: { type: String, required: true },
  website: { type: String, required: true }
});

// Clean JSON output: remove __v and convert _id -> id
authorSchema.set("toJSON", {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  }
});

module.exports = mongoose.model("Author", authorSchema);