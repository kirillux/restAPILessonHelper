/**
 * Created by Kirill on 9/29/2016.
 */
'use strict';
const fileHandler = require('./file-handlers');
const fs = require('fs');
const multiparty = require('multiparty');
const Path = require('path');

const fileRoutes = [
    {
        method: 'GET',
        path: '/files/upload',
        handler: {
            file: 'updownloadview.html'

        },
        config: {
            auth:{
                scope: ['admin']},
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Server upload html file',
            notes: 'Html file for uploading files',
        }
    },
    {
        method: 'POST',
        path: '/files/submit',
        handler: function (request, reply) {
            var form = new multiparty.Form();
            form.parse(request.payload, function (error, fields, file) {
                if (error) {
                    return reply(error);
                }
                else {
                    fileHandler.uploadFile(file.file[0], reply);
                }
            });
        },
        config: {
            auth:{
                scope: ['admin']},
            tags: ['api'],
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: false
            },
        }
    },
    {
        method: 'GET',
        path: '/files/showfiles',
        handler: fileHandler.getFiles,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
        }
    },
    {
        method: 'GET',
        path: '/files/download/{file}',
        handler: fileHandler.downloadFile,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
        }
    }
];

module.exports = fileRoutes;