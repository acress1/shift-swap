const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    name: String,
    date: Number,
    time: Number,
    position: String

})

const Shift = mongoose.model('Shift', shiftSchema)

module.exports = Shift;