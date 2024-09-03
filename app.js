const Book = require("../models/Books");
const path = require("path");
const methodOverride = require("method-override");
var express = require("express");
var mongoose = require("mongoose");
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
app.post("/new", async function (req, res) {
  await Book.create(req.body);
  res.redirect("/");
});
// display selected book
app.delete("/:id", async function (req, res) {
  await Book.deleteOne({isbn: req.params.id});
  res.redirect("/");
});
//edit book in list
app.put("/:id", async function (req, res) {
    const isbn = req.params.id;
    await Book.findOneAndUpdate({isbn: isbn}, req.body);
    res.redirect
});
//removes book from list
router.post("/delete/:id", async function (req, res, next) {
  await Book.deleteOne({isbn: req.params.id});
  res.redirect("/");
});

module.exports = router;