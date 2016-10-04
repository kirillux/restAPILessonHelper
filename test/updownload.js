// /**
//  * Created by Kirill on 10/4/2016.
//  */
// const Code = require('code');   // assertion library
// const Lab = require('lab');
// const server = require('../server');
// const lab = exports.lab = Lab.script();
//
// const internals = {};
//
// ////////////////***************************************** Setup values ***********************//////////////////////////////
// internals.testUserId = '57ebde2e3650341a98398322';
// internals.testUserIdAdmin = '57ecd72a7c343a1c281c1bcb';
// internals.goodPasswordAll = 'bacon';
// internals.goodUrlUserId = '/api/user/57e5440cef828525f0292f79';
// ////////////////***************************************** Start Tests functions ***********************//////////////////////////////
//
// //Get upload page as admin * only acces if admin
// lab.experiment('get upload page', function () {
//     lab.test('get upload page', function (done) {
//         let options = {
//             method: 'get',
//             url: '/files/upload',
//             headers: {
//                 authorization: internals.headerGoodLoginAdmin
//             }
//         };
//         server.inject(options, function (response) {
//             let result = response.result;
//             Code.expect(response.statusCode).to.equal(200);
//             Code.expect(result.data);
//             done();
//         });
//     });
// });
//
// //Get upload page as user * only acces if admin
// lab.experiment('get upload page should give not authorized', function () {
//     lab.test('get upload page', function (done) {
//         let options = {
//             method: 'get',
//             url: '/files/upload',
//             headers: {
//                 authorization: internals.headerGoodLogin()
//             }
//         };
//         server.inject(options, function (response) {
//             let result = response.result;
//             Code.expect(response.statusCode).to.equal(401);
//             Code.expect(result.data);
//             done();
//         });
//     });
// });
//
// ////////////////////////////////////*********************User credentials*********************//////////////////////////
// //Auth header function with correct credentials
// internals.headerGoodLogin = function () {
//     let username = internals.testUserId;
//     let password = internals.goodPasswordAll;
//     return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
// };
//
// //Only username login
// internals.headerLoginOnlyUserName = function () {
//     let username = internals.testUserId;
//     let password = '';
//     return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
// };
//
// //Only password login
// internals.headerLoginOnlyPassword = function () {
//     let username = '';
//     let password = internals.goodPasswordAll;
//     return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
// };
//
// //Admin Login with good credentials
// internals.headerGoodLoginAdmin = function () {
//     let username = internals.testUserIdAdmin;
//     let password = internals.goodPasswordAll;
//     return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
//
// };