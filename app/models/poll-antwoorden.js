/**
 * Created by Kirill on 10/17/2016.
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let PollAntwoord = new Schema ({
    antwoord:{type: String, required: true},
    counter:{type: Number, default: 0},
});

module.exports = Mongoose.model('PollAntwoord', PollAntwoord, 'PollAntwoord');