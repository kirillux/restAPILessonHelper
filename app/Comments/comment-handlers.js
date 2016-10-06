/**
 * Created by Kirill on 9/26/2016.
 */

const VakModel = require('../models/vak');
const CommentModel = require('../models/comment');
const commentHandlers = {};
const Boom = require('boom');
const socketService = require('../services/socketService');

//Ophalen vak van een vak met een id
//Met VakId en het bijbehorende schema moet een comment worden geplaatst bij de comment sectie van het vak
//Bericht met commentmodel pushen, plaatsen in het vak comment section
//vervolgens dit opslaan en returnen
commentHandlers.postComment = function (request, reply) {
    //Find model by ID
    VakModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            //Invullen van data in het nieuwe comment model
            let comment = new CommentModel({bericht: request.payload.bericht, user: request.auth.credentials._id});
            //Push comment data in het data model van VakModel found by id
            data.comments.push(comment);
            data.save(function (error) {
                if (error) {
                    reply(Boom.badRequest(error));
                }
                socketService.sendAll(JSON.stringify('bericht:' + comment.bericht + ' geplaatst door user: ' + comment.user));
                reply(data);
            });
        }
    });
};
module.exports = commentHandlers;

