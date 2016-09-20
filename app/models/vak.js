/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let vakSchema = new Schema({
    vakname: String,
    vakLeraar: String, //id of user,
    vakBeschrijving: String,
    comments:[
        {
            body: { type: String},
            created: { type: Date, default: Date.now}
        }
    ]
});
module.exports = Mongoose.model('Vak', vakSchema, 'Vak');