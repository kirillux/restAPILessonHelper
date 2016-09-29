/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

//Vakschema voor vakken
let vakSchema = new Schema({
    vakname: String,
    vakLeraar: String, //id of user,
    vakBeschrijving: String,
    comments:[]
});
module.exports = Mongoose.model('Vak', vakSchema, 'Vak');