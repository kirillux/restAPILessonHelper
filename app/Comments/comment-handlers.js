/**
 * Created by Kirill on 9/26/2016.
 */
const VakModel = new require('../models/vak');
const commentHandlers = {};
const Boom = require('boom');

commentHandlers.postComment = function (request, reply) {
    VakModel.findById({_id: request.params.id}, function (error, data) {
        console.log(request.payload);
        if (error) {
            reply(Boom.notFound(data));
        }
        var postComment = new VakModel();
        postComment.comments.push(request.payload,{user: request.auth.credentials.name});
        postComment.save(function (err) {
            if (!err) console.log('Success!');
        });
        reply(postComment)
    });
};

module.exports = commentHandlers;

