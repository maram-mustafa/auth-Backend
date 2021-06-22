"use strict";

require("dotenv").config();
const cors = require("cors");
const express = require("express");

const booksHandler = require("./modules/mongooes-books")
const addbooksHandler=require("./modules/addbooksHandler")
const deletebooksHandler=require("./modules/DeleteBooks")

const server = express();
server.use(cors());
server.use(express.json());
const PORT = process.env.PORT;

///////////////////////////////////ROUTE///////////////////////////////////////

//////// localhost:3001
server.get("/", homeHandler);

////////// localhost:3001/books
server.get("/books", booksHandler.booksHandler);

/////////////localhost:3001/addbooks 
server.post("/addbooks", addbooksHandler);


/////////////localhost:3001/deletebooks
server.delete('/deletebooks/:id', deletebooksHandler)


function homeHandler(req, res) {
  res.send("home page");
}

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
