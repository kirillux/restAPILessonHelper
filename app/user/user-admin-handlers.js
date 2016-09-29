/**
 * Created by Kirill on 9/26/2016.
 */
const Boom = require('boom');
const UserModel = new require('../models/user');

const UserAdminHandlers = {};

UserAdminHandlers.deleteUserById = function (request, reply) {
    UserModel.findByIdAndRemove({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else if (data === null) {
            reply(Boom.notFound(error, data));
        }
        else {
            reply({
                data: data,
                message: 'Has been removed'
            });
        }
    });
};

module.exports = UserAdminHandlers;
