'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require('good');


//mongoose ORM
const Mongoose = require ('mongoose');

const server = new Hapi.Server();

//Connect 2 mongoose database
Mongoose.connect('mongodb://adminhapi:admintest@ds029466.mlab.com:29466/lessonhelper');

server.connection({
    host: 'localhost',
    port: 3000
});
const options = {
    info: {
        'title': 'Test API Documentation',
        'version': '16.5.0',
    }
};

//Server start + console Good plugin
server.register([
    Inert,
    Vision,
    {
        register: HapiSwagger,
        options: options
    },
    {
        register: Good,
        options: {
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        response: '*',
                        log: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout']
            }
        }
    },
], (err) => {

    server.start( (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Server running at:', server.info.uri);
        }
    });
});

//Adding routes here:
const routes = require('./routes');
server.route(routes);



