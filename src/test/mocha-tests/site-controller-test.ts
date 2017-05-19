import * as assert from "assert";
import * as chai from "chai";
import * as chaiHttp from "chai-http";

chai.use(chaiHttp);
var request = chai.request("localhost:3000");

describe("SiteControllerTest", () => {

    before(() => {
       require('../application/app');
    });

    it("should response to get request", (done) => {
        request.get("/").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "GET");
            done();
        });
    });

    it("should response to post request", (done) => {
        request.post("/").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "POST");
            done();
        });
    });

    it("should response to patch request", (done) => {
        request.patch("/").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "PATCH");
            done();
        });
    });

    it("should response to put request", (done) => {
        request.put("/").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "PUT");
            done();
        });
    });

    it("should response to delete request", (done) => {
        request.delete("/").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "DELETE");
            done();
        });
    });

    it("should authenticate request and send Authenticated as response", (done) => {
       request.post("/auth").set("Authorization", "1234").end((err, res) => {
            assert.equal(res.statusCode, 200);
            assert.equal(res.text, "Authenticated");
            done();
       });
    });

    it("should authenticate request and send Unauthorized as response", (done) => {
        request.post("/auth").end((err, res) => {
            assert.equal(res.statusCode, 401);
            assert.equal(res.text, "Unauthorized");
            done();
        });
    });

});