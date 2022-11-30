const Books = require("../models/books");

module.exports = {
  getAllBooks: (req, res, next) => {
    Books.find({}, (error, books) => {
      if (error) next(error);
      req.data = books;
      req.data.sort((a, b) => {return a.series - b.series;});
      next();
    })
  },
  getBook: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findById({_id: params_book_id}, (error, book) => {
      if (error) next(error);
      req.data = book;
      next();
    });
  },
  createNewBook: (req, res, next) => {
    let bookParams = new Books({
      title: req.body.title,
      author: req.body.author,
      publisher: req.body.publisher
    });
    bookParams.save((error, savedBook) => {
      if (error) next(error);
      res.locals.redirect = "/admin";
      next();
    })
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  updateBook: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findByIdAndUpdate(params_book_id, 
      {
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher
      }, (error, book) => {
        if (error) next(error);
        req.data = book;
        res.locals.redirect = "/admin";
        next();
    });
  },
  deleteBook: (req, res, next) => {
    let params_book_id = req.params.id;
    Books.findByIdAndRemove({_id: params_book_id}, (error, book) => {
      if (error) next(error);
      req.data = book;
      res.locals.redirect = "/admin";
      next();
    });
  }
};