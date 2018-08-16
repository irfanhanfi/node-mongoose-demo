const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


const { ObjectID } = require('mongodb');
// const { mongoose }  =  require('./db/mongoose');
// const { User }  =  require('./models/user');
const { Todo } = require('./models/todo');


const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 3000;
app.post('/todos', (req, res) => {
    const todo = new Todo({
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

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completedAt = null;
        body.completed = false;
    }

    Todo.findByIdAndUpdate(id, { $set: { body } }, { new: true })
        .then((todo) => {
            if (!todo) {
                res.status(404).send();
            } else {
                res.send({ todo });
            }
        }).catch((e) => {
            res.status(400).send();
        });
});


app.listen(port, () => {
    console.log(`Listing at port ${port}`);
})


// const newTodo = Todo({text: "Default todo"});

// newTodo.save().then((result) => {
//     console.log('result', JSON.stringify(result, undefined, 2));
// }).catch((error) => {
//     console.log('error', error);
// });



// const User = User({email: "irfanhanfi@gmail.com"});

// User.save().then((result) => {
//     console.log('result', JSON.stringify(result, undefined, 2));
// }).catch((error) => {
//     console.log('error', error);
// });