/**
 * Created by Kirill on 10/17/2016.
 */
const pollHandlersVak = require('./poll-handlers-vak');
const Joi = require('joi');

const pollRoutesVak = [
    {
        method: 'POST',
        path: '/poll/vak/{id}',
        handler: pollHandlersVak.createVakPoll,
        config: {
            validate: {
                payload: {
                    vraag: Joi.string().min(6).required(),
                },
                params: {
                    id: Joi.string().required(),
                }
            },
            // Swagger documentation fields tags, description, note
            tags: ['api'],
        }
    },


]

module.exports = pollRoutesVak;