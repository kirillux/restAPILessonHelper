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
        'version': '16.5.0'
    }
};
//Server start + console Good plugin + pluginss
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
    {
        register: require('./app/user/index'),
        options: {}
    },
    {
        register: require('./app/vak/index'),
        options: {}
    }
], (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});

server.start( (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server running at:', server.info.uri);
    }
});
module.exports = server;

