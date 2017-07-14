import "mocha";

import "../app/app1";
import "../app/app2";

import * as assert from "assert";

import chai = require("chai");
import chaiHttp = require("chai-http");

chai.use(chaiHttp);

const req1 = chai.request("localhost:3000");
const req2 = chai.request("localhost:3001");

describe("Test Suite", () => {

    it("should get index", async function() {
        let res;

        res = await req1.get("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");

        res = await req2.get("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");
    });

    it("should post index", async function() {
        let res;

        res = await req1.post("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");

        res = await req2.post("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");
    });

    it("should patch index", async function() {
        let res;

        res = await req1.patch("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");

        res = await req2.patch("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");
    });

    it("should put index", async function() {
        let res;

        res = await req1.put("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");

        res = await req2.put("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");
    });

    it("should delete index", async function() {
        let res;

        res = await req1.delete("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");

        res = await req2.delete("/");
        assert.equal(res.status, 200);
        assert.equal(res.text, "OK");
    });

    it("should login", async function() {
        let res;

        res = await req1.post("/login")
            .set("Content-Type", "application/json")
            .send({
                username: "username",
                password: "password"
            });
        assert.equal(res.status, 200);

        res = await req2.post("/login")
            .set("Content-Type", "application/json")
            .send({
                username: "username",
                password: "password"
            });
        assert.equal(res.status, 200);
    });

    it("should authenticate user when logging in", function() {
        let res;

        return req1.post("/login").send({
            username: "username",
            password: "incorrect"
        }).catch(err => {
            assert.equal(err.status, 401);
            return Promise.resolve();
        });
    });

    it("should say hello", async function() {
        let res;

        res = await req1.get("/greet");
        assert.equal(res.status, 200);
        assert.equal(res.text, "Hello world");

        res = await req1.get("/greet?name=John");
        assert.equal(res.status, 200);
        assert.equal(res.text, "Hello John");

        res = await req2.get("/greet");
        assert.equal(res.status, 200);
        assert.equal(res.text, "Hello world");

        res = await req2.get("/greet?name=John");
        assert.equal(res.status, 200);
        assert.equal(res.text, "Hello John");
    });
});
