const Owners = require("./mongooes-books");

function updatebooksHandler(req, res) {
  const { email, name, desc, status } = req.body;
  let id = req.params.id;

  Owners.Owners.find({ email: email }, (err, data) => {
    if (err) {
      res.status(500).send("there is an error");
    } else {
      let index = data[0].books.findIndex((elem) => {
        return elem._id == id;
      });
      console.log(index);

      data[0].books.splice(index, 1, {
        name: name,
        desc: desc,
        status: status,
      });

      data[0].save();
      res.send(data[0].books);
    }
  });
}

module.exports = updatebooksHandler;
