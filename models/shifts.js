const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const shiftSchema = Schema({
    position: {type: String, required: true },
    name: {type: String, required: true },
    date: {type: String, required: true },
    time: {type: String, required: true }
})

const Shift = mongoose.model('Shift', shiftSchema)

module.exports = Shift;