/**
 * Created by Kirill on 9/26/2016.
 */
const VakModel = new require('../models/vak');
const CommentModel = require('../models/comment');
const commentHandlers = {};
const Boom = require('boom');

//Ophalen vak van een vak met een id
//Met VakId en het bijbehorende schema moet een comment worden geplaatst bij de comment sectie van het vak
//Bericht met commentmodel pushen, plaatsen in het vak comment section
//vervolgens dit opslaan en returnen
commentHandlers.postComment = function (request, reply) {
    //Find model by ID
    VakModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.notFound(data));
        }
        //Invullen van data in het nieuwe comment model
        let comment = new CommentModel({bericht: request.payload.bericht,user: request.auth.credentials._id});
        //Push comment data in het data model van VakModel found by id
        data.comments.push(comment);
        data.save(function (saveError) {
            if(saveError)
            {

                reply(Boom.badRequest(saveError,data));
            }
            reply(data);
        });
    });
};
module.exports = commentHandlers;

