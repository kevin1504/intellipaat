let assert = require("node:assert");
const { title } = require("node:process");
const { describe, it } = require("node:test");

describe("enter the project name to test", function () {
    // describe("enter the property to test", function () {
    it("enter the objective of the test", function () {
        //testing code
        assert.equal(1, 2, "first error message to display")
    })
    // })
    // describe("enter the function to test", function () {
    it("enter the objective of the test", function () {
        //testing code
        assert.equal(1, 1, "second error message to display")
    })
    // })
    // describe("enter the object to test", function () {
    it("enter the objective of the test", function () {
        //testing code
        assert.deepEqual({ title: "Ironman" }, { title: "Ironman" }, "third first error message to display")
    })
    it("this is a pending test");
    // })
});