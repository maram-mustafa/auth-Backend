require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(`${MONGODB_URI}/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect("mongodb://localhost:27017/test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const book = new mongoose.Schema({
  name: String,
  desc: String,
  status: String,
});

const owner = new mongoose.Schema({
  email: String,
  books: [book],
});

const Owners = mongoose.model("bookOwnera", owner);

function seedOwnerCollection() {
  const maram = new Owners({
    email: "maram.w.mustafa@gmail.com",

    books: [
      {
        name: "The Candy Makers",
        desc: "This Book About CANDY",
        status: "life changing",
      },
      {
        name: "My Little Golden Book About DOGS",
        desc: "This Book About Dogs",
        status: " faviorite five",
      },
    ],
  });

  // console.log(maram);
  maram.save();
}
// seedOwnerCollection();

function booksHandler(req, res) {
  let email = req.query.email;

  Owners.find({ email: email }, (err, data) => {
    err ? res.status(500).send("there is error") : res.send(data[0].books);
  });
}

module.exports = {
  booksHandler,
  Owners,
};
////
