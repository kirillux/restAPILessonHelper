'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Good = require('good');
const Basic = require('hapi-auth-basic');
const Bcrypt = require('bcryptjs');


//mongoose ORM
const Mongoose = require ('mongoose');
const server = new Hapi.Server();

//Connect 2 mongoose database
Mongoose.connect('mongodb://adminhapi:admintest@ds029466.mlab.com:29466/lessonhelper');

server.connection({
    host: 'localhost',
    port: 3000
});
const optionsSwagger = {
    info: {
        'title': 'Test API Documentation',
        'version': '16.5.0'
    }
};

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
    }
], (err) => {

        if (err) {
            return console.error(err);
        }
        server.start(() => {
            console.info(`Server started at ${ server.info.uri }`);
        });
    });

const UserModel =  new require('./app/models/user');

const validate = function (request, username, password, callback) {
    if(!username)
    {
        return callback(null, false);
    }
    else
    {
        UserModel.find({_id: username}, function (error, data) {
            console.log(data[0]._id);
            console.log(data[0].password);
            if (!username) {
                return callback(null, false);
            }
            Bcrypt.compare(password, data[0].password, (err, isValid) => {
                callback(err, isValid, { _id: data[0]._id, name: data[0].username });
            });
        });
    }

};

server.register(Basic, (err) => {

    if (err) {
        throw err;
    }
    server.auth.strategy('simple', 'basic', {validateFunc: validate});
    server.route({
        method: 'GET',
        path: '/',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('hello, ' + request.auth.credentials.name);
            }
        }
    });
    server.route({
        method: 'GET',
        path: '/pagina1',
        config: {
            auth: 'simple',
            handler: function (request, reply) {
                reply('dit is pagina 1 hello, ' + request.auth.credentials.name);
            }
        }
    });
});

module.exports = server;