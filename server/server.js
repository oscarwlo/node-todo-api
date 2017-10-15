let express = require('express');
let bodyParser = require('body-parser');
let {ObjectID} = require('mongodb');

let {mongoose} = require('./db/mongoose');
let {Todo} = require('./models/todo');
let {User} = require('./models/user');

let app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/1234324
app.get('/todos/:id', (req, res) => {
  let id = req.params.id;

  // Valid id using isValid
    // respond with 404 - send back empty send
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  // findById
    //success case
      // if todo - send it back
      // if no todo - send back 404 with empty body
    // error
      // 400 - and send empty body back
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

      res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
