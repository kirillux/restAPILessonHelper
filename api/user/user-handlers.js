/**
 * Created by Kirill on 9/19/2016.
 */
'use strict';
const UserModel = new require('./models/user');
const UserHandlers = {};

UserHandlers.getUsers = function(request, reply) {
    //Fetch all data from mongodb User Collection
    UserModel.find({}, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'User Data Successfully Fetched',
                data: data
            });
        }
    });
};

UserHandlers.getUserByID = function (request, reply) {
    //Finding user for particular userID
    UserModel.find({_id: request.params.id}, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            if (data.length === 0) {
                reply({
                    statusCode: 200,
                    message: 'User Not Found',
                    data: data
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Data Successfully Fetched',
                    data: data
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
            reply({
                statusCode: 503,
                message: error
            });
        } else {
            reply({
                statusCode: 201,
                message: 'User Saved Successfully'
            });
        }
    });
};

UserHandlers.updateUserInfo = function (request, reply) {
    // `findOneAndUpdate` is a mongoose model methods to update a particular record.
    UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'User Updated Successfully',
                data: data
            });
        }
    });
};

UserHandlers.deleteUserById = function (request, reply) {

    // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    UserModel.findOneAndRemove({_id: request.params.id}, function (error) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Error in removing User',
                data: error
            });
        }
        else {
            reply({
                statusCode: 200,
                message: 'User Deleted Successfully'
            });
        }
    });
};
module.exports = UserHandlers;