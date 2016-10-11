/**
 * Created by Kirill on 9/29/2016.
 */

const fs = require('fs');
const Boom = require('boom');
const fileHandler = {};
const FileModel = new require('../models/file');
const VakModel = new require('../models/vak');



fileHandler.downloadFile = function (request, reply) {
    FileModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else if (data === null) {
            reply(Boom.notFound(error));
        } else {
            reply(data.fileData).header('Content-disposition', 'attachment; filename=' + data.fileName).header('Content-Type', data.contentType);

        }
    });
};

fileHandler.uploadFile = function (fields, file, reply) {
    let storeFile = new FileModel;
    ////Use realFileSync!!! if not realFile is aSync and will do other stuff and some of the data is not known yet
    storeFile.fileData = fs.readFileSync(file.path);
    storeFile.fileName = file.originalFilename;
    storeFile.contentType = file.headers['content-type'];

    storeFile.save(function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        if (file.originalFilename.length === 0) {
            reply(Boom.lengthRequired(error))
        }
        else {
            reply({fileData: data});
        }
    });

};



module.exports = fileHandler;