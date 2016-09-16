/**
 * Created by Kirill on 9/14/2016.
 */
"use strict";
var Joi = new require('joi');
var VakHandlers = require('../handlers/vakHandlers');


module.exports = [
    {
        method: 'GET',
        path: '/api/vak',
        handler: VakHandlers.getVakken,
        config: {
            // Include this API in swagger documentation
            tags: ['api'],
            description: 'Get All vak data',
            notes: 'Get All vak data'
        }
    },
    {
        method: 'POST',
        path: '/api/vak',
        handler: VakHandlers.createVak,
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Add vak',
            notes: 'Add vak',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Vak name is required
                    vakname: Joi.string().alphanum().min(3).max(15).required(),
                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/vak/{id}',
        handler: VakHandlers.updateVakInfo,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Update specific vak data',
            notes: 'Update specific vak data',

            // Joi api validation
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    vakname: Joi.string().alphanum().min(3).max(15).optional(),
                }
            }
        }
    },

    {
        method: 'DELETE',
        path: '/api/vak/{id}',
        handler: VakHandlers.deleteVakById,
        config: {
            tags: ['api'],
            description: 'Remove specific vak data',
            notes: 'Remove specific vak data',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    }
];

