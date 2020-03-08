const mongoose = require('mongoose')

const shiftSchema = new mongoose.Schema({
    name: {type: String, required: true },
    date: {type: Number, required: true },
    time: {type: Number, required: true },
    position: {type: String, required: true }

})

const Shift = mongoose.model('Shift', shiftSchema)

module.exports = Shift;