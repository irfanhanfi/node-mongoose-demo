const {ObjectId} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');

var id = '6b752af8dd4f48368401e872s';

if (!ObjectId.isValid(id))
{
    console.log('Id is invalid');
    return;
}

Todo.find({
    _id: id
}).then(todos => {
    console.log('todos',todos);
});

Todo.findOne({
    _id: id
}).then(todo => {
    console.log('todo', todo);
});

Todo.findById(id).then(todo => {
    if (!todo){
        console.log('Id not found');
    }
    console.log('findbyid', todo);
}).catch(e => {
    console.log(e);
});