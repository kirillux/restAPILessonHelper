/**
 * Created by Kirill on 9/19/2016.
 */
const Code = require('code');   // assertion library
const Lab = require('lab');
const server = require('../server');
const lab = exports.lab = Lab.script();

const internals = {};

////////////////***************************************** Setup values ***********************//////////////////////////////
internals.testUserId = '57ebde2e3650341a98398322';
internals.testUserIdAdmin = '57ecd72a7c343a1c281c1bcb';
internals.goodPasswordAll = 'bacon';
internals.goodUrlUserId = '/api/user/57e5440cef828525f0292f79';
////////////////***************************************** Start Tests functions ***********************//////////////////////////////

//Test lab tutorial Example Test
lab.experiment('test tutorial', function () {
    lab.test('returns true when 1 + 1 equals 2', (done) => {
        Code.expect(1 + 1).to.equal(2);
        done();
    });
});

//Login without username
lab.experiment('Login without username', function () {
    lab.test('Login endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/login',
            headers: {
                authorization: internals.headerLoginOnlyPassword()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});

//Login without password
lab.experiment('Login without password', function () {
    lab.test('Login endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/login',
            headers: {
                authorization: internals.headerLoginOnlyUserName()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});

//Login with correct credentials
lab.experiment('Login with correct credentials', function () {
    lab.test('Logout endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/login',
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
});

//Logout without a session
lab.experiment('Logout without being logged in', function () {
    lab.test('Logout endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/logout',
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});

//Get all users without login
lab.experiment('get users', function () {
    lab.test('get users endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/api/user',
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});

//Get all users while logged in
lab.experiment('get users', function () {
    lab.test('get users endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/api/user',
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
})

//Get all users while logged in
lab.experiment('get users', function () {
    lab.test('get users endpoint', function (done) {
        let options = {
            method: 'get',
            url: '/api/user',
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
});

//Post user while logged in
lab.experiment('Post user', function () {
    lab.test('Post user while logged in', function (done) {
        let options = {
            method: 'post',
            url: '/api/user',
            payload: {
                email: 'stringTestLab@stringlab.com',
                username: 'stringTestLab',
                password: 'happy12345',
                scope: 'user'
            },
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
});

//Post user while logged in with bad credentials
lab.experiment('Post user', function () {
    lab.test('Post user while logged in with bad credentials', function (done) {
        let options = {
            method: 'post',
            url: '/api/user',
            payload: {
                email: 's',
                username: 's',
                password: 'h',
                scope: 'u'
            },
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(400);
            Code.expect(result.data);
            done();
        });
    });
});

//Delete user while being a user Only admin allowed
lab.experiment('Delete user while being a user', function () {
    lab.test('Delete user while being a user should be forbidden not in scope', function (done) {
        let options = {
            method: 'delete',
            url: '/api/user/{id}',
            payload: {
                id: internals.testUserId
            },
            headers: {
                authorization: internals.headerGoodLogin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(403);
            Code.expect(result.data);
            done();
        });
    });
});

//Delete nonexistent user as admin
lab.experiment('Delete a non existent user as admin', function () {
    lab.test('Delete a user that is nonexistent as an admin should give status 400', function (done) {
        let options = {
            method: 'delete',
            url: '/api/user/x',
            headers: {
                authorization: internals.headerGoodLoginAdmin()
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(400);
            Code.expect(result.data);
            done();
        });
    });
});

//Put update credentials as a user with incorrect values
lab.experiment('Update user credentials given a specific ID', function () {
    lab.test('Update credentials with not allowed information', function (done) {
        let options = {
            method: 'put',
            url: '/api/user/{id}',
            headers: {
                authorization: internals.headerGoodLogin()
            },
            payload: {
                email: '',
                username: '',
                password: '',
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(400);
            Code.expect(result.data);
            done();
        });
    });
});

//Put update credentials as a user with correct values
lab.experiment('Update user credentials given a specific ID', function () {
    lab.test('Update credentials with correct values', function (done) {
        let options = {
            method: 'put',
            url: internals.goodUrlUserId,
            headers: {
                authorization: internals.headerGoodLogin()
            },
            payload: {
                email: 'string@string.nl',
                username: 'stringLab',
                password: 'string'
            }
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
});


////////////////////////////////////*********************User credentials*********************//////////////////////////
//Auth header function with correct credentials
internals.headerGoodLogin = function () {
    let username = internals.testUserId;
    let password = internals.goodPasswordAll;
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

//Only username login
internals.headerLoginOnlyUserName = function () {
    let username = internals.testUserId;
    let password = '';
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

//Only password login
internals.headerLoginOnlyPassword = function () {
    let username = '';
    let password = internals.goodPasswordAll;
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

//Admin Login with good credentials
internals.headerGoodLoginAdmin = function () {
    let username = internals.testUserIdAdmin;
    let password = internals.goodPasswordAll;
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');

};