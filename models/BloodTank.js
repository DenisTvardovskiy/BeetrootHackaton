const { Schema, model } = require('mongoose')


const BloodTank = new Schema({
    title: { type: String, required: true, unique: true},
    current: { type: Number, required: true },
    spent: { type: Number, required: true },
})
 
module.exports = model('BloodTank', BloodTank)