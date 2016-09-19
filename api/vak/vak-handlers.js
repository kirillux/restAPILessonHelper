/**
 * Created by Kirill on 9/14/2016.
 */
'use strict';
const VakModel = new require('./models/vak');
const VakHandlers = {};

VakHandlers.getVakken = function(request, reply) {
    //Fetch all data from mongodb User Collection
    VakModel.find({}, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'Vak Data Successfully Fetched',
                data: data
            });
        }
    });
};

VakHandlers.updateVakInfo = function (request, reply) {
    // `findOneAndUpdate` is a mongoose model methods to update a particular record.
    VakModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'Vak Updated Successfully',
                data: data
            });
        }
    });
};

VakHandlers.createVak = function (request, reply) {
    // Create mongodb user object to save it into database
    var vak = new VakModel(request.payload);
    // Call save methods to save data into database
    // and pass callback methods to handle error
    vak.save(function (error) {
        if (error) {
            reply({
                statusCode: 503,
                message: error
            });
        } else {
            reply({
                statusCode: 201,
                message: 'Vak Saved Successfully'
            });
        }
    });
};

VakHandlers.deleteVakById = function (request, reply) {

    // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    VakModel.findOneAndRemove({_id: request.params.id}, function (error) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Error in removing vak',
                data: error
            });
        }
        else {
            reply({
                statusCode: 200,
                message: 'Vak Deleted Successfully'
            });
        }
    });
};
module.exports = VakHandlers;