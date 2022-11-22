const Books = require("../models/books");

exports.getAllBooks = (req, res, next) => {
  Books.find({}, (error, books) => {
    if (error) next(error);
    req.data = books;
    req.data.sort((a, b) => {return a.series - b.series;});
    next();
  });
};

exports.getBook = (req, res, next) => {
    let params_book_id = req.params.books;
    Books.findOne({id: params_book_id}, (error, book) => {
      if (error) next(error);
      req.data = book;
      next();
    });
  };