const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: [
    {
      type: String,
      required: true,
      enum: ["Non-fiction", "Business", "Autobiography"],
    },
  ],
  language: {
    type: String,
  },
  country: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0,
  },
  summary: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
