/**
 * Created by Kirill on 9/26/2016.
 */

'use strict';
const Joi = new require('joi');
const commentHandlers = require('./comment-handlers');

const commentRoutes =[
    {
        method: 'POST',
        path: '/api/vak/{id}/comment',
        handler: commentHandlers.postComment,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Post comment @ specific Vak',
            notes: 'Post comment',
            // Joi api validation
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    bericht: Joi.string().min(3).required(),

                }
            }
        }
    },

];

module.exports = commentRoutes;