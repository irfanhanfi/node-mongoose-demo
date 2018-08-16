var mongoose =  require('mongoose');

// Todo
var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    complete:{
        type: Boolean,
        default: false
    },
    completeAt:{
        type: Number,
        default: null
    }
});

module.exports = {
    Todo
};