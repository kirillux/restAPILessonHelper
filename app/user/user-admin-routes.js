/**
 * Created by Kirill on 9/26/2016.
 */
const Joi = new require('joi');
const userHandlers = require('./user-admin-handlers');
const userAdminRoutes = [
    {
        method: 'DELETE',
        path: '/api/user/{id}',
        handler: userHandlers.deleteUserById,
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
module.exports = userAdminRoutes;


