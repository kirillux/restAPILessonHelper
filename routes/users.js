/**
 * Created by Kirill on 9/13/2016.
 */
"use strict";

var Joi = new require('joi');
var UserHandlers = require('../handlers/userHandlers');

module.exports = [
    {
        method: 'GET',
        path: '/api/user',
        handler: UserHandlers.getUsers,
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
        handler: UserHandlers.getUserByID,
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
        handler: UserHandlers.createUser,
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
                    username: Joi.string().alphanum().min(3).max(15).optional(),
                    password: Joi.string().min(6).max(15).required()

                }
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/user/{id}',
        handler: UserHandlers.updateUserInfo,
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
                    password: Joi.string().min(3).max(10).required()
                }
            }
        }
    },
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: UserHandlers.deleteUserById,
        config: {
            tags: ['api'],
            description: 'Remove specific user data',
            notes: 'Remove specific user data',
            validate: {
                params: {
                    id: Joi.string().required()
                }
            }
        }
    }
];