/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Joi = new require('joi');
const userHandlers = require('./user-handlers');

const userRoutes = [
    {
        method: 'GET',
        path: '/api/user',
        handler: userHandlers.getUsers,
        config: {
            // Include this API in swagger documentation
            tags: ['api'],
            description: 'Get All User data',
            notes: 'Get All User data'
        }
    },
    {
        //Getting data for user by id
        method: 'GET',
        path: '/api/user/{id}',
        handler: userHandlers.getUserByID,
        config: {
            tags: ['api'],
            description: 'Get specific user data',
            notes: 'Get specific user data',
            validate: {
                // Id is required field
                params: {
                    id: Joi.string().required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/user',
        handler: userHandlers.createUser,
        config: {
            // "tags" enable swagger to document API
            tags: ['api'],
            description: 'Add user',
            notes: 'Add user',
            // We use Joi plugin to validate request
            validate: {
                payload: {
                    // Both name and age are required fields
                    email: Joi.string().email(),
                    username: Joi.string().alphanum().min(3).max(15).required(),
                    password: Joi.string().min(6).max(15).required(),
                    scope: Joi.any().valid(['admin', 'user'])

                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/user/{id}',
        handler: userHandlers.updateUserInfo,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Update specific user data',
            notes: 'Update specific user data',
            // Joi api validation
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    email: Joi.string().email(),
                    username: Joi.string().alphanum().min(3).max(10).optional(),
                    password: Joi.string().min(6).max(15).required()
                }
            }
        }
    },
 {
        method: 'GET',
        path: '/login',
        config: {
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name + ' Scope: ' + request.auth.credentials.scope);
            }
        }
    },
    {
        method: 'GET',
        path: '/logout',
        handler: function (request, reply) {
                reply('You are logged out now').code(401);
            },
        config:{
            auth: {
                strategy: 'simple',
                mode: 'optional'
            }


        }

    }


];

module.exports = userRoutes;