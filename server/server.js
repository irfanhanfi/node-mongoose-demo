require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');
const { authenticate } = require('./middleware/authenticate');

const app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    });
    todo.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo.find({ _creator: req.user._id }).then((todos) => {
        res.send({ todos });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findOne({ _id: id, _creator: req.user._id }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({ todo });
        }
    }, (error) => {
        res.status(400).send(error);
    });
});

app.delete('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }
    Todo.findOneAndRemove({ _id: id, _creator: req.user._id }).then((todo) => {
        if (!todo) {
            res.status(404).send();
        } else {
            res.send({ todo });
        }
    }, (error) => {
        res.status(400).send(error);
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true })
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

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((error) => {
        console.log('error',error)
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.send({ users });
    }, (error) => {
        res.status(400).send(error);
    });
});

app.get('/users/me', authenticate, (req, res) => {
    const token = req.header('x-auth');
    User.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        res.send({ user });
    }).catch((error) => {
        res.status(401).send(error);
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            user.generateAuthToken().then((token) => {
                res.header('x-auth', token).send();
            });
        }).catch((err) => {
            res.status(400).send();
        });
});

app.listen(process.env.PORT, () => {
    console.log(`Listing at port ${process.env.PORT}`);
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