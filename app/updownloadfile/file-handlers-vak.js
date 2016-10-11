/**
 * Created by Kirill on 10/11/2016.
 */

const fs = require('fs');
const Boom = require('boom');
const fileHandlerVak = {};
const FileModel = new require('../models/file');
const VakModel = new require('../models/vak');


fileHandlerVak.getFilesVak = function (request, reply) {
    VakModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            reply(data.files)
        }
    });
};

fileHandlerVak.uploadFileBijVak = function (fields, file, reply) {
    //Find model by ID
    VakModel.findById({_id: fields.vakId}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            let storeFile = new FileModel({
                fileData: fs.readFileSync(file.path),
                fileName: file.originalFilename,
                contentType: file.headers['content-type'],
                _VakId: data._id
            });
            //save model
            storeFile.save(function (error) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                //saved
            });
            //Push Saved model in found Vak
            data.files.push(storeFile);
            data.save(function (error, data) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                else {
                    reply(data);
                }
            });

        }
    });


};


module.exports = fileHandlerVak;