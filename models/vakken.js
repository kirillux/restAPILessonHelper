/**
 * Created by Kirill on 9/14/2016.
 */
'use strict';

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var vakSchema = new Schema({
    vakname: String,
});

module.exports = Mongoose.model('Vak', vakSchema, 'Vak');