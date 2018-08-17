// const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};
const token = jwt.sign(data, 'abc123');
console.log('token', token);
const decoded = jwt.verify(token, 'abc123');
console.log('decoded', decoded );

// var message = 'I am a string';
// var hashed = SHA256(message).toString();
// console.log(message, hashed);