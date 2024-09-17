import { expect } from 'chai';
import {system_under_test} from '../lib/system_under_test.cjs'


describe("system under test", function() {
    let token = "pass"
    //let token = "fail"
    
    describe("returns a correct field", function() {
        it("should return the userId", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 1,
                "customerId": ""
            }
            const result = system_under_test(token, request);
            expect(result.userId).to.not.be.null
            expect(result.userId).to.equal("test_user");
        });
        it("should return the customer Id", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 1,
                "customerId": crypto.randomUUID()
            }
            const result = system_under_test(token, request);
            expect(result.customerId).to.not.be.null
            expect(result.customerId).to.equal(request.customerId);
        });
        it("should return a start date", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 1,
                "customerId": crypto.randomUUID()
            }
            const result = system_under_test(token, request);
            expect(result.startDate).to.not.be.null
            expect(result.startDate).to.be.a('date');
        });
        it("should return the hours logged", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 23,
                "customerId": crypto.randomUUID()
            }
            const result = system_under_test(token, request);
            expect(result.hoursLogged).to.not.be.null
            expect(result.hoursLogged).to.equal(request.hoursLogged);
        });
        it("should return a sourceRequest", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 23,
                "customerId": crypto.randomUUID()
            }
            const result = system_under_test(token, request);
            expect(result.sourceRequest).to.not.be.null
            expect(result.sourceRequest).to.be.a('string');
        });
        it("should return the calculatedRate", function() {
            const request = {
                "userId": "test_user",
                "hoursLogged": 23,
                "customerId": crypto.randomUUID()
            }
            const result = system_under_test(token, request);
            expect(result.calculatedRate).to.not.be.null
            expect(result.calculatedRate).to.be.a('number');
            expect(result.calculatedRate).to.equal(request.hoursLogged*8.5);
        });
    });
})
