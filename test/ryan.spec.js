import { expect } from 'chai';
import {system_under_test} from '../lib/system_under_test.cjs'

describe("Basic tests", function() {
    describe("main function", function() {
        const basic_request = {
            "userId": "test_user",
            "hoursLogged": 1,
            "customerId": ""
        }
        describe("token handling", function() {
            it("should throw an execption if a bad token is passed", function() {
                expect(() => system_under_test("bad_token", {})).to.throw()
            });
            it("should handle a passing token", function() {
                var result = system_under_test("pass", basic_request)
                expect(result).to.not.be.null
            });
            it("should handle a failing token", function() {
                var result = system_under_test("fail", basic_request)
                expect(result).to.not.be.null
            });
        });
        describe("basic returns and validation", function() {
            it("should return a valid contract", function() {
                var result = system_under_test("pass", basic_request);
                expect(Object.keys(result)).to.have.members(["userId", "sourceRequest", "startDate", "hoursLogged", "customerId", "calculatedRate"]);
            });
            context("when passing valid requests", function() {
                it("should return the userId that was passed in", function() {
                    var result = system_under_test("pass", basic_request);
                    expect(result.userId).to.equal("test_user");
                });
                it("should return a unique source request", function() {
                    var result = system_under_test("pass", basic_request);
                    expect(result.sourceRequest).to.not.be.null
                });
                it("should return the date the request was started", function() {
                    var result = system_under_test("pass", basic_request);
                    expect(result.startDate).to.be.a('date');
                });
                it("should return the hours logged that was passed in", function() {
                    var request = {...basic_request}
                    request.hoursLogged = 16
                    var result = system_under_test("pass", request) ;
                    expect(result.hoursLogged).to.equal(request.hoursLogged)
                });
                it("should return the customerId that was passed in", function() {
                    var request = {...basic_request}
                    request.customerId = crypto.randomUUID()
                    var result = system_under_test("pass", request);
                    expect(result.customerId).to.equal(request.customerId)
                });
            });
            context("when passing a bad request", function() {
                it("should give an error if you don't pass the userId in", function() {
                    var request = {...basic_request}
                    delete request.userId
                    expect(() => system_under_test("pass", request)).to.throw();
                });
                it("should give an error if you don't pass the customerId in", function() {
                    var request = {...basic_request}
                    delete request.customerId
                    expect(() => system_under_test("pass", request)).to.throw();
                });
                it("should give an error if you don't pass the hoursLogged in", function() {
                    var request = {...basic_request}
                    delete request.hoursLogged
                    expect(() => system_under_test("pass", request)).to.throw();
                });
            });
        });
        context("when using a passing token", function() {
            it("should return a calculated rate based on the hours", function () {
                const hours = 16
                const expectedRate = 16*8.5
                var result = system_under_test("pass", {"userId": "test_user", "hoursLogged": hours, "customerId": crypto.randomUUID()});
                expect(result.calculatedRate).to.be.a('number');
                expect(result.calculatedRate).to.equal(expectedRate);
            });
        });
        context("when using a failing token", function() {
            it("should return a different contract", function () {
                var result = system_under_test("fail", basic_request);
                expect(Object.keys(result)).to.have.members(["userId", "sourceRequest", "hoursLogged", "customerId", "calculatedRate", "requestType"]);
            });
            it("should return a calculated rate based on the hours", function () {
                const hours = 16
                const expectedRate = 16*8.5
                var result = system_under_test("fail", {"userId": "test_user", "hoursLogged": hours, "customerId": crypto.randomUUID()});
                expect(result.calculatedRate).to.be.a('number');
                expect(result.calculatedRate).to.not.equal(expectedRate);
            });
        });
    });
});
