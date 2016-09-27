/**
 * Created by Kirill on 9/27/2016.
 */

const Lab = require("lab");
const Code = require("code");
const server = require('../server');
const lab = exports.lab = Lab.script();
const Comments = require('../app/Comments/index');



lab.experiment("Comments plugin", function() {
    lab.test("Plugin successfully loads", function(done) {
        server.pack.require("Comments", function(err) {
            Code.expect(err).to.equal(null);
            done();
        });
    });

    lab.test("Plugin registers routes", function(done) {
        var table = server.table();
        Code.expect(table).to.have.length(1);
        Code.expect(table[0].path).to.equal("/Comments");
        done();
    });
});