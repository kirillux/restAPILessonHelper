/**
 * Created by Kirill on 10/12/2016.
 */

const pollHandlers = require('./poll-handlers');
const Joi = require('joi');

const pollRoutes = [

    {
        method: 'POST',
        path: '/poll/',
        handler: pollHandlers.createPoll,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Create a Poll',
            notes: 'Create poll',
            // Joi api validation
            validate: {
                payload: {
                    vraag: Joi.string().min(6).required(),
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/poll/{id}/antwoord/',
        handler: pollHandlers.createAnswer,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Create answer @ given poll id',
            notes: 'Create answer @ given poll id',
            // Joi api validation
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
                payload: {
                    antwoord: Joi.string().min(1).required(),
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/poll/{id}',
        handler: pollHandlers.getPoll,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get poll @ given poll id',
            notes: 'Get poll @ given poll id',
            // Joi api validation
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
            }
        }
    },

    {
        method: 'GET',
        path: '/poll/all',
        handler: pollHandlers.getAllPolls,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Get polls',
            notes: 'Get polls',

        }
    },
    {
        method: 'GET',
        path: '/poll/question/vote/{id}',
        handler: pollHandlers.voteOnQuestion,
        config: {
            // Swagger documentation fields tags, description, note
            tags: ['api'],
            description: 'Vote on poll question',
            notes: 'Vote on poll question',
            validate: {
                params: {
                    //`id` is required field and can only accept string data
                    id: Joi.string().required()
                },
            }
        }
    },
    {
        method: 'DELETE',
        path: '/poll/{id}',
        handler: pollHandlers.deletePollById,
        config: {
            auth:{
                scope: ['admin']},
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

module.exports = pollRoutes;