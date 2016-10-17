/**
 * Created by Kirill on 10/12/2016.
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let pollSchema = new Schema ({
    vraag:{type: String, required: true},
    antwoorden:[{ type: Schema.ObjectId, ref: 'PollAntwoord' }]
});

module.exports = Mongoose.model('Poll', pollSchema, 'Poll');
