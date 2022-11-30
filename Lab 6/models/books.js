const mongoose = require("mongoose"),
  booksSchema = mongoose.Schema({
    title: {type: String, required: true},
    series: Number,
    description: String,
    author: {type: String, required: true},
    publisher: String,
    cover: String,
  });
module.exports = mongoose.model("Books", booksSchema);