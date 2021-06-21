"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();
server.use(cors());

const PORT = process.env.PORT;

///////////////////////////////////ROUTE///////////////////////////////////////

//////// localhost:3001
server.get("/", homeHandler);

////////// localhost:3001/books
server.get("/books", booksHandler);

//////////////////////////////MONGO/////////////////////////////////////////

mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const book = new mongoose.Schema({
  name: String,
  desc: String,
  img: String,
});

const owner = new mongoose.Schema({
  email: String,
  books: [book],
});

const Owners = mongoose.model("Book", owner);

function seedOwnerCollection() {
  const maram = new Owners({
    email: "maram.w.mustafa@gmail.com",

    books: [
      {
        name: "book1",
        desc: "this book about .......",
        img: "https://www.google.jo/url?sa=i&url=https%3A%2F%2Fapkpure.com%2Far%2Fblack-background-wallpapers%2Fcom.blackbackgroundwallpapersimages&psig=AOvVaw1oMLBJSsh1-RDqbzLekplX&ust=1624363176131000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMj4xK_WqPECFQAAAAAdAAAAABAD",
      },
      {
        name: "book2",
        desc: "this book about darkkk .......",
        img: "https://www.google.jo/url?sa=i&url=https%3A%2F%2Fapkpure.com%2Far%2Fblack-background-wallpapers%2Fcom.blackbackgroundwallpapersimages&psig=AOvVaw1oMLBJSsh1-RDqbzLekplX&ust=1624363176131000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMj4xK_WqPECFQAAAAAdAAAAABAD",
      },
    ],
  });

  // console.log(maram);
  maram.save();
}
// seedOwnerCollection();

//////////////////////////////functions///////////////////////////////////
function homeHandler(req, res) {
  res.send("home page");
}

function booksHandler(req, res) {
  let email = req.query.email;

  Owners.find({ email: email }, (err, data) => {
    err ? console.log("there is error") : res.send(data[0].books) ;
  });
}



server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
