/**
 * Created by Kirill on 9/29/2016.
 */

const fs = require('fs');
const Boom = require('boom');
const fileHandler = {};

fileHandler.uploadFile = function (file, reply) {
    const uploadPath = __dirname + '/../../public/uploads/'

    fs.readFile(file.path, function (error, data) {
        fs.writeFile(uploadPath + file.originalFilename, data, function (error) {
            console.log(uploadPath)
            if (error) {
                reply(error);
            }

            else {
                reply('File uploaded to:' + uploadPath + file.originalFilename);
            }
        });
    });
};

fileHandler.getFiles = function (request, reply) {
    const path = __dirname + '/../../public/uploads/';
    fs.readdir(path, function (error, items) {
        if (items.length === 0) {
            reply(Boom.notFound(error));
        }
        else {
            reply(items);
        }
    });
};

fileHandler.downloadFile = function (request, reply) {
    let file = request.params.file;
    let path = __dirname + '/../../public/uploads/' + file;
    if (file.length === 0) {
        reply(Boom.notFound())
    } else {
        reply.file(path);
    }

};

module.exports = fileHandler;