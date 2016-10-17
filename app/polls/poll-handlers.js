/**
 * Created by Kirill on 10/12/2016.
 */
const pollModel = new require('../models/poll');
const pollAnswerModel = new require('../models/poll-antwoorden');
const Boom = require('boom');
const pollHandlers = {};



pollHandlers.getAllPolls = function (request, reply) {
    //Fetch all data from mongodb User Collection
    pollModel.find({}, function (error, data) {
        if (error && data === undefined) {
            reply(Boom.badRequest(error));
        } else if (!data.length) {
            reply(Boom.notFound(error));
        } else {
            reply({data: data})
        }
    });
}

pollHandlers.getPoll = function (request, reply) {

    pollModel.findById({_id: request.params.id}).populate('antwoorden') // only works if we pushed refs to children
        .exec(function (error, data) {
            if (error)
            {
                reply(Boom.badRequest(error));
            } else if (data === null){
                reply(Boom.notFound(error));
            }
            else{
                reply(data);
            }
        });
}

pollHandlers.createPoll = function (request, reply) {
    let newPoll = new pollModel(request.payload);
    // Call save methods to save data into database
    // and pass callback methods to handle error
    newPoll.save(function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        } else {
            reply({data: data});
        }
    });
};

pollHandlers.createAnswer = function (request, reply) {
    //Find model by ID
    pollModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            //Invullen van data in het nieuwe comment model
            let newAnswer = new pollAnswerModel(request.payload);
            newAnswer.save(function (error) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                //saved
            });
            //Push comment data in het data model van VakModel found by id
            data.antwoorden.push(newAnswer);
            data.save(function (error, data) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                else {
                    reply(data);
                }
            });
        }

    });
}

pollHandlers.voteOnQuestion = function (request, reply) {
    pollAnswerModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            data.counter++;
            data.save(function (error, data) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                else {
                    reply(data);
                }
            });
        }
    });
}

pollHandlers.deletePollById = function(request,reply)
{
    pollModel.findByIdAndRemove({_id: request.params.id}, function (error, data) {
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

}

module.exports = pollHandlers;