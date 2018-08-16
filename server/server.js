var express = require('express');
var bodyParser = require('body-parser');

var { ObjectID } = require('mongodb');
// var { mongoose }  =  require('./db/mongoose');
// var { User }  =  require('./models/user');
var { Todo } = require('./models/todo');


var app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((result) => {
        res.status(200).send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({ todo });
        }
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({ todo });
        }
    }, (error) => {
        res.status(400).send(error);
    });
});

app.listen(port, () => {
    console.log(`Listing at port ${port}`);
})


// var newTodo = Todo({text: "Default todo"});

// newTodo.save().then((result) => {
//     console.log('result', JSON.stringify(result, undefined, 2));
// }).catch((error) => {
//     console.log('error', error);
// });



// var User = User({email: "irfanhanfi@gmail.com"});

// User.save().then((result) => {
//     console.log('result', JSON.stringify(result, undefined, 2));
// }).catch((error) => {
//     console.log('error', error);
// });