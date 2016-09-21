/**
 * Created by Kirill on 9/21/2016.
 */
server.register([require('bell'),require('hapi-auth-cookie')], function (err) {

    if (err) {
        console.error(err);
        return process.exit(1);
    }
    server.auth.strategy('github-oauth', 'bell', {
        provider: 'github',
        password: 'github-encryption-password-secret', //Password used for encryption
        clientId: '3242dd34d3e5e46d1ac7',//'YourAppId',
        clientSecret: 'd60b1ce82ae0827cc4ddcdebcf9b5f8ebef4696e',//'YourAppSecret',
        isSecure: false
    });

    server.route([
        {
            method: ['GET', 'POST'],
            path: '/auth/github',
            config: {
                auth: 'github-oauth', //<-- use our twitter strategy and let bell take over
                handler: function (request, reply) {
                    if (!request.auth.isAuthenticated) {
                        return reply(Boom.unauthorized('Authentication failed: ' + request.auth.error.message));
                    }
                    return reply('Hello ' + request.auth.credentials.profile.username);
                }
            }
        }

    ]);
});
