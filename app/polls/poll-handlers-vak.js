/**
 * Created by Kirill on 10/17/2016.
 */
const VakModel = new require('../models/vak');
const pollModel = new require('../models/poll');
const pollAnswerModel = new require('../models/poll-antwoorden');
const Boom = require('boom');
const pollHandlersVak = {};

pollHandlersVak.createVakPoll = function(request,reply)
{
    VakModel.findById({_id: request.params.id}, function (error, data) {
        if (error) {
            reply(Boom.badRequest(error));
        }
        else if (data === null) {
            reply(Boom.notFound(error));
        }
        else if (!error && data !== null) {
            let newPoll = new pollModel(request.payload);

            //save model
            newPoll.save(function (error) {
                if (error) {
                    reply(Boom.badRequest(error))
                }
                //saved
            });
            //Push Saved model in found Vak
            data.polls.push(newPoll);
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



module.exports = pollHandlersVak;
