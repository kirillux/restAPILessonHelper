/**
 * Created by Kirill on 10/11/2016.
 */
'use strict';
const fileHandlerVak = require('./file-handlers-vak');
const fs = require('fs');
const multiparty = require('multiparty');
const Path = require('path');
const Joi = require('joi');
const Boom = require('boom');

const fileRoutesVak = [
    {
        method: 'GET',
        path: '/files/vak/',
        handler: {
            file: 'updownloadfilevak.html'
        },
        config: {

            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Server upload html file',
            notes: 'Html file for uploading files',
        }
    },
    {
        method: 'GET',
        path: '/files/vak/{id}/',
        handler: fileHandlerVak.getFilesVak,
        config: {
            validate: {
                params: {
                    id: Joi.string().required(),
                }
            },
            // Swagger documentation fields tags, description, note
            tags: ['api'],
        }
    },
    {
        method: 'POST',
        path: '/files/vak/upload/submit/',
        handler: function (request, reply) {
            var form = new multiparty.Form();
            form.parse(request.payload, function (error, fields, file) {

                if (error) {
                    return reply(Boom.badRequest(error));
                }
                else {
                    fileHandlerVak.uploadFileBijVak(fields, file.file[0],reply);
                }
            });
        },
        config: {
            auth: {
                scope: ['admin']
            },
            tags: ['api'],
            payload: {
                maxBytes: 209715200,
                output: 'stream',
                parse: false
            },
        }
    }
]

module.exports = fileRoutesVak;