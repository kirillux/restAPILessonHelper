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
    let vakGegevens = VakModel.findById({_id: fields.vakId}, function (error, data) {
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
            storeFile.save();
            data.files.push(storeFile);
            data.save();
            reply(data)
            console.log(data)


            //storeFile.save(function (error) {
            //    if (error) return handleError(error);
            //    // thats it!
            //});
            //
            //data.files.push(storeFile);
            //data.save();
            //reply({fileData: data});
            ////Use realFileSync!!! if not realFile is aSync and will do other stuff and some of the data is not known yet
        }

    });
};
//
//fileHandlerVak.downloadFileBijVak = function (request, reply) {
//    VakModel.findById({_id: '57dbdf11a744ce19d8c195ab'}, function (error, data) {
//        if (error) {
//            reply(Boom.badRequest(error));
//        }
//        else if (data === null) {
//            reply(Boom.notFound(error));
//        }
//        else if (!error && data !== null) {
//            let x = data.files[0]
//            reply(x.fileData).header('Content-disposition', 'attachment; filename=' + x.fileName).header('Content-Type', x.contentType);
//
//        }
//    });
//};

module.exports = fileHandlerVak;