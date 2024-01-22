const mongoose = require('mongoose')

var contact = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
}, {collection: 'contact_messages'})

const Contact = mongoose.model('Contact', contact)

module.exports = Contact