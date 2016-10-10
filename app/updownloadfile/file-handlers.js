/**
 * Created by Kirill on 9/29/2016.
 */

const fs = require('fs');
const Boom = require('boom');
const fileHandler = {};
const FileModel = new require('../models/file');
const VakModel = new require('../models/vak');


fileHandler.uploadFile = function (fields, file, request, reply) {
    //Find model by ID
    VakModel.findById({_id: fields.vakId}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            console.log(data);
            let storeFile = new FileModel;
            ////Use realFileSync!!! if not realFile is aSync and will do other stuff and some of the data is not known yet
            storeFile.fileData = fs.readFileSync(file.path);
            storeFile.fileName = file.originalFilename;
            storeFile.contentType = file.headers['content-type'];
            storeFile.user = request.auth.credentials._id;

            data.files.push(storeFile);
            data.save(function (error, data) {
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

        }
    });


};

fileHandler.getFiles = function (request, reply) {
    FileModel.find({}, function (error, data) {
        if (error && data === undefined) {
            reply(Boom.badRequest(error));
        } else if (!data.length) {
            reply(Boom.notFound(error));
        } else {
            reply({data: data});
        }
    });

};

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

module.exports = fileHandler;