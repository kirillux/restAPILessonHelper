/**
 * Created by Kirill on 10/4/2016.
 */
const Code = require('code');   // assertion library
const Lab = require('lab');
const server = require('../server');
const lab = exports.lab = Lab.script();
const multiparty = require('multiparty');

const internals = {};

////////////////***************************************** Setup values ***********************//////////////////////////////
internals.testUserId = '57ebde2e3650341a98398322';
internals.testUserIdAdmin = '57ecd72a7c343a1c281c1bcb';
internals.goodPasswordAll = 'bacon';
internals.goodUrlUserId = '/api/user/57e5440cef828525f0292f79';
////////////////***************************************** Start Tests functions ***********************//////////////////////////////

//Get upload page as public user expect 401
lab.experiment('get upload page without user credentials expect 401', function () {
    lab.test('get upload page', function (done) {
        let options = {
            method: 'GET',
            url: '/files/upload',
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});


//Need Robin for this
//lab.experiment('post file upload page with user credentials expect 200', function () {
//
//    lab.test('get upload page', function (done) {
//        let file = {
//            name: 'Ren & Stimpy',
//            description: [
//                'Ren Höek is a hot-tempered, "asthma-hound" Chihuahua.',
//                'Stimpson "Stimpy" J. Cat is a three-year-old dim-witted and happy-go-lucky cat.'
//            ].join('\n'),
//            filename: 'ren.png',
//            checksum: '5965ae98ecab44a2a29b87f90c681229',
//            width: 256,
//            height: 256,
//            filedata: new Buffer('lets imagine that this is an image')
//        };
//
//        let options = {
//            method: 'POST',
//            url: '/files/upload/submit',
//            payload: file,
//            headers: {
//                authorization: internals.headerGoodLoginAdmin()
//            },
//
//        };
//        server.inject(options, function (response) {
//            let result = response.result;
//            Code.expect(response.statusCode).to.equal(401);
//            Code.expect(result.data);
//            done();
//        });
//    });
//});


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