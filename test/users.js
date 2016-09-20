/**
 * Created by Kirill on 9/19/2016.
 */
const Code = require('code');   // assertion library
const Lab = require('lab');
const server = require('../server');
const lab = exports.lab = Lab.script();

//Test lab tutorial
lab.experiment('test tutorial', function(){
    lab.test('returns true when 1 + 1 equals 2', (done) => {
        Code.expect(1 + 1).to.equal(2);
        done();
    });
});

lab.experiment('Users rest api test', function () {
    lab.test("main endpoint lists usernames on the network", function(done) {
        let options = {
            method: "GET",
            url: "/api/user"
        };
        server.inject(options, function(response) {
            let result = response.result;
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(result.data).to.have.length(3);
            done();
        });
    });
});

