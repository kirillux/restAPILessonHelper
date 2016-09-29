const Code = require('code');   // assertion library
const Lab = require('lab');
const server = require('../server');
const lab = exports.lab = Lab.script();

const internals = {};

////////////////***************************************** Setup values Vak***********************//////////////////////////////
//Vak id that exists
internals.existentVakIdUrl = '/api/vak/57dbdf11a744ce19d8c195ab';
//Valid vak id that does not exists
internals.nonExistentVakIdUrlValid = '/api/vak/57dbdf11a744ce19d8c195aa';
////////////////***************************************** Setup User credentials ***********************//////////////////////////////

//Test user correct credentials
internals.testUserId = '57ebde2e3650341a98398322';
internals.testUdersIdAdmin = '57ecd72a7c343a1c281c1bcb';
internals.goodPasswordAll = 'bacon';
////////////////***************************************** Start Tests functions***********************///////////////////////////


//Test lab tutorial Example Test
lab.experiment('test tutorial', function () {
    lab.test('returns true when 1 + 1 equals 2', (done) => {
        Code.expect(1 + 1).to.equal(2);
        done();
    });
});

//Get all vakken without authentication
lab.experiment('get vakken without log in', function () {
    lab.test('Get vakken without login should give unauthorized: 401', function (done) {
        let options = {
            method: 'get',
            url: '/api/vak'
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(401);
            Code.expect(result.data);
            done();
        });
    });
});

//Get all vakken with login
lab.experiment('get vakken with login', function () {
    lab.test('Get vakken with login should give 200', function (done) {
        let options = {
            method: 'get',
            url: '/api/vak',
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

//post vakken with good login and (bad/no) vak values
lab.experiment('post/create vak with login with bad values', function () {
    lab.test('post/create vak with login with bad values should give a bad reques 400', function (done) {
        let options = {
            method: 'post',
            url: 'api/vak',
            headers: {
                authorization: internals.headerGoodLogin()
            },
            payload: {
                vakname: '',
                vakBeschrijving: '',
                vakLeraar: ''
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

//get vak by a valid ID but not existent
lab.experiment('get vak ID non existent but valid', function () {
    lab.test('Get a vak ID non existent but valid shoud give 404 not found', function (done) {
        let options = {
            method: 'get',
            url: internals.nonExistentVakIdUrlValid,
            headers: {
                authorization: internals.headerGoodLogin()
            },
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(404);
            Code.expect(result.data);
            done();
        });
    });

});

//get existent vak by id with an existent ID
lab.experiment('get vak ID existent and valid', function () {
    lab.test('Get a vak ID existent, valid should give 200', function (done) {
        let options = {
            method: 'get',
            url: internals.existentVakIdUrl,
            headers: {
                authorization: internals.headerGoodLogin()
            },
        };
        server.inject(options, function (response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data);
            done();
        });
    });
});

//Put vak name
lab.experiment('Change vak name with a correct value', function () {
    lab.test('Change vak name with a correct value should give 200', function (done) {
        let options = {
            method: 'put',
            url: internals.existentVakIdUrl,
            headers: {
                authorization: internals.headerGoodLogin()
            },
            payload: {
                vakname: 'LabTest'
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

//Put vak name
lab.experiment('Change vak name with an incorrect value', function () {
    lab.test('Change vak name with a incorrect value should give 400', function (done) {
        let options = {
            method: 'put',
            url: internals.existentVakIdUrl,
            headers: {
                authorization: internals.headerGoodLogin()
            },
            payload: {
                vakname: ''
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
    let username = internals.testUdersIdAdmin;
    let password = internals.goodPasswordAll;
    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');

};