const mongoose = require('mongoose')

var user = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    first_name: String,
    last_name: String,
    address: String,
    phone: String,
    isAdmin: { type: Boolean, default: false },
}, {collection: 'users'})

const User = mongoose.model('User', user)

module.exports = User