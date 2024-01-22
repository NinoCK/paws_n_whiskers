const mongoose = require('mongoose')

var appointment = new mongoose.Schema({
    petName: String,
    petType: String,
    petAge: Number,
    date: String,
    time: String,
    reason: String
}, {collection: 'appointments'})

const Appointment = mongoose.model('Appointment', appointment)

module.exports = Appointment