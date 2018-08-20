var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })
    .then(
        () => { console.log('ready to use. The `mongoose.connect()` promise resolves') },
        err => { console.log('handle initial connection error', err) }
    );
  

module.exports = {
    mongoose
};