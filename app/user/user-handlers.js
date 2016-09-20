/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Boom = require('boom');
const UserModel = new require('../models/user');

const UserHandlers = {};

UserHandlers.getUsers = function(request, reply) {
    //Fetch all data from mongodb User Collection
    UserModel.find({}, function (error, data) {
        if (error) {
            reply(Boom.notFound(error));
        } else {
            reply({
                data:data
            });
        }
    });
};

UserHandlers.getUserByID = function (request, reply) {
    //Finding user for particular userID
    UserModel.find({_id: request.params.id}, function (error, data) {
        if (data === 0) {
            reply(Boom.notFound(error));
        }
        if (error) {
            reply(Boom.badRequest(error));
        } else {
            if (UserModel.find === 0) {
                reply(Boom.notFound(error));
            } else {
                reply({
                    data:data
                });
            }
        }
    });
};

UserHandlers.createUser = function (request, reply) {
    // Create mongodb user object to save it into database
    var user = new UserModel(request.payload);
    // Call save methods to save data into database
    // and pass callback methods to handle error
    user.save(function (error) {
        if (error) {
            reply(Boom.badRequest(error));
        } else {
            reply({
                user: user,
                message: 'Has been added'
            });
        }
    });
};

UserHandlers.updateUserInfo = function (request, reply) {
    // `findOneAndUpdate` is a mongoose model methods to update a particular record.
    UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else {
            reply({
                data: data
            });
        }
    });
};

UserHandlers.deleteUserById = function (request, reply) {
    // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    UserModel.findOneAndRemove({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else {
            reply({
                data: data,
                message: 'Has been removed',
            });
        }
    });
};
module.exports = UserHandlers;