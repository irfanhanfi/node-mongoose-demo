var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true })
    .then(
        () => { console.log('ready to use. The `mongoose.connect()` promise resolves to undefined') },
        err => { console.log('handle initial connection error', err) }
    );
  

module.exports = {
    mongoose
};