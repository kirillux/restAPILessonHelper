/**
 * Created by Kirill on 10/7/2016.
 */
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

let fileSchema = new Schema({
    fileName: String,
    contentType: String,
    created: {type: Date, default: Date.now},
    fileData: Buffer,


});

module.exports = Mongoose.model('File', fileSchema, 'File');