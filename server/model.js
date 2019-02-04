const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    date: Date,
    days: Number,
    cost: Number
});

const Cost = mongoose.model('Cost', costSchema)


module.exports = Cost // <-- export your model
