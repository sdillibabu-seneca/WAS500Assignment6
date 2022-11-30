const mongoose = require("mongoose");
const methodOverride = require("method-override");
const express = require("express"),
  app = express(),
  Books = require("./models/books"),
  BooksController = require("./controllers/booksController"),
  errorController = require("./controllers/errorController"),
  layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(layouts, express.static(__dirname));
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);

mongoose.connect(
  "mongodb+srv://sdillibabu:WAS500@was500-books.yjhil0b.mongodb.net/?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
);

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use((req, res, next) => {
  date = new Date();
  console.log(`request made to: ${req.url} at ${date}`);
  next();
});

app.get("", (req, res) => {
  res.render('index');
});

app.get("/books", BooksController.getAllBooks, (req, res) => {
  res.render('books', { books: req.data });
});

app.get("/admin", BooksController.getAllBooks, (req, res) => {
  res.render('admin', { books: req.data });
});

app.get("/contact", (req, res) => {
  res.render('contact');
});

app.get("/survey", (req, res) => {
  res.render('survey');
});

app.get("/addnewbook", (req, res) => {
  res.render('addnewbook');
});

app.post("/create", BooksController.createNewBook, BooksController.redirectView);
app.post("/books/:id/update", BooksController.updateBook, BooksController.redirectView);
app.delete("/books/:id/delete", BooksController.deleteBook, BooksController.redirectView);

app.get("/books/:id", BooksController.getBook, (req, res) => {
  res.render('bookpage', { info: req.data });
});

app.get("/edit/:id", BooksController.getBook, (req, res) => {
  res.render('edit', { info: req.data });
});

app.get("/honesty", (req, res) => {
  res.render('honesty');
});

app.use(errorController.logErrors);
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

app.listen(app.get("port"), () => {
  console.log(
    `Server running at http://localhost:${app.get("port")}`
  );
});