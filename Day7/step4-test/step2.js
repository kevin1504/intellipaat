let assert = require("node:assert");
const { describe, it, before, beforeEach, afterEach, after } = require("node:test");

describe("enter the project name to test", function () {
    describe("enter the function that you want to test", function () {
        before(() => {
            console.log("+++++++++++++ this will be called before all the tests");
        })
        beforeEach(() => {
            console.log("+++++++++++++ this will be called before each of the tests");
        })
        after(() => {
            console.log("+++++++++++++ this will be called after all the tests");
        })
        afterEach(() => {
            console.log("+++++++++++++ this will be called after each of the tests");
        })

        it("enter the objective of the test", function () {
            //testing code
            assert.equal(1, 1, "first error message to display")
        })

        it("enter the objective of the test", function () {
            //testing code
            assert.deepEqual({ title: "Ironman" }, { title: "Ironman" }, "third first error message to display")
        })
    })
});