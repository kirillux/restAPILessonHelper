/**
 * Created by Kirill on 9/27/2016.
 */
'use strict';
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

//Berichten comments*
let commentSchema = new Schema({
    bericht: String,
    date: { type: Date, default: Date.now },
    user: String
});
module.exports = Mongoose.model('Comment', commentSchema, 'Comment');