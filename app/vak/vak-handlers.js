/**
 * Created by Kirill on 9/14/2016.
 */
'use strict';
const VakModel = new require('../models/vak');
const VakHandlers = {};
const Boom = require('boom');

VakHandlers.getVakken = function(request, reply) {
    //Fetch all data from mongodb User Collection
    VakModel.find({}, function (error, data) {
        if (error) {
            reply(Boom.notFound(error));
        } else {
            reply({data});
        }
    });
};

VakHandlers.updateVakInfo = function (request, reply) {
    // `findOneAndUpdate` is a mongoose model methods to update a particular record.
    VakModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else {
            reply({
                data: data,
                message: 'Has been updated'
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
            reply(Boom.badRequest(error));
        } else {
            reply({
                data: data,
                message: 'Vak saved Successfully'
            });
        }
    });
};

VakHandlers.deleteVakById = function (request, reply) {
    // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
    VakModel.findOneAndRemove({_id: request.params.id}, function (error) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else {
            reply({
                data: data,
                message: 'Vak Deleted Successfully'
            });
        }
    });
};
module.exports = VakHandlers;