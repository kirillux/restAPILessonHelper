'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require('good');
const Basic = require('hapi-auth-basic');

//mongoose ORM
const Mongoose = require ('mongoose');
const server = new Hapi.Server();

//Connect 2 mongoose database
Mongoose.Promise = global.Promise;
Mongoose.connect('mongodb://adminhapi:admintest@ds029466.mlab.com:29466/lessonhelper');

server.connection({
    host: 'localhost',
    port: 3000
});

module.exports = server;

const optionsSwagger = {
    info: {
        'title': 'Test API Documentation',
        'version': '16.5.0'
    }
};
//Options for plugin good
const optionsGood = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ ops: '*' }]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        },]}
};

    //Server start + console Good plugin + plugins
    server.register([
        //Load Auth first
        {
            register: require('./app/auth/basic-auth')
        },
        {
            register: Inert
        },
        {
            register: Vision
        },
        {
            register: HapiSwagger,
            options: optionsSwagger
        },
        {
            register: Good,
            options: optionsGood
        },
        {
            register: require('./app/user/index'),
        },
        {
            register: require('./app/vak/index'),
        },
        {
            register: require('./app/Comments/index')
        }
    ], (error) => {

        if (error) {
            return console.error(error);
        }
        server.start(() => {
            console.info(`Server started at ${ server.info.uri }`);
        });
});
