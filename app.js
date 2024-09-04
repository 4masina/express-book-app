const Book = require("../models/Books");
const path = require("path");
const methodOverride = require("method-override");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

mongoose.connect(
  `${process.env.MONGO_DB_API_KEY}`
);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.js());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


/* GET home page. */
app.get("/", async function (req, res) {
  const books = await Book.find();
  res.render("books", { books });
});
// display form
app.get("/new", function (req, res) {
  res.render("new-book");
});
// add new book
app.post("/", async function (req, res) {
  await Book.create(req.body);
  res.redirect("/");
});
// delete book from list
app.delete("/:id", async function (req, res) {
  await Book.deleteOne({isbn: req.params.id});
  res.redirect("/");
});
//book details
app.get("/book-details/:id", async function (req, res) {
  const isbn = req.params.id;
  const book = await Book.findOne({isbn: isbn});
  if (book) {
    res.render("book-details", {book});
  }else {
    res.status(404).send("book not found");
  }
});
//update book in list
app.put("/:id", async function (req, res) {
    const isbn = req.params.id;
    await Book.findOneAndUpdate({isbn: isbn}, req.body);
    res.redirect
});
//edit book from list
app.get("/edit/:id", async function (req, res) {
  try {
    const isbn = req.params.id; 
    const book = await Book.findOne({isbn: isbn});

    if (book) {
      res.render("edit-book", {book});
    }else{
      res.status(404).send("book not found");
    }
  }catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
  });

//start server
app.listen(3000, () => console.log("server running on port 3000"));