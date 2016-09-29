/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const Boom = require('boom');
const UserModel = new require('../models/user');

const UserHandlers = {};
//Mongoose notes
//Find returns [], findByOne/findById returns (object) als niets gevonden null

UserHandlers.getUsers = function(request, reply) {
    //Fetch all data from mongodb User Collection
    UserModel.find({}, function (error, data) {
        if (error && data === undefined) {
            reply(Boom.badRequest(error, data));
        } else if (!data.length){
            reply(Boom.notFound(error,data));
        } else {
            reply({data:data});
        }
    });
};

UserHandlers.getUserByID = function (request, reply) {
    //Finding user for particular userID
    UserModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error,data));
        }
        else if (data === null){
                reply(Boom.notFound(error,data));
            }
        else {
            reply({data: data});
        }
    });
};

UserHandlers.createUser = function (request, reply) {
    // Create mongodb user object to save it into database
    let user = new UserModel(request.payload);
    // Call save methods to save data into database
    // and pass callback methods to handle error
    user.save(function (error, data) {
        if (error) {
            reply(Boom.badRequest(error,data));
        } else {
            reply({data: data});
        }
    });
};

UserHandlers.updateUserInfo = function (request, reply) {
    // `findOneAndUpdate` is a mongoose model methods to update a particular record.
    UserModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else if(data === null) {
            reply (Boom.notFound(error,data));
        } else {
            //Data from payload
            data.email = request.payload.email;
            data.username = request.payload.username;
            data.password = request.payload.password;
            //save data
            data.save(function(error){
                if(error)
                {
                    reply(Boom.badRequest(error,data));
                }
                reply({data: data });
            });
        }
    });
};


module.exports = UserHandlers;