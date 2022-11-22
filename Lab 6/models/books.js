const mongoose = require("mongoose"),
  booksSchema = mongoose.Schema({
    id: String,
    title: String,
    series: Number,
    description: String,
    author: String,
    publisher: String,
    cover: String,
  });
module.exports = mongoose.model("Books", booksSchema);