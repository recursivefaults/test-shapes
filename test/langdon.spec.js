import { expect } from 'chai';
import {system_under_test} from '../lib/system_under_test.cjs'

describe("system under test", function() {
    let token = "pass"
    xit('should return the expected value', function() {
        //Doesn't work because we can't control certain values
        const request = {
            "userId": "test_user",
            "hoursLogged": 10,
            "customerId": "test_customer"
        }
        const date = new Date()
        const expected = {
            "userId": "test_user",
            "hoursLogged": 10,
            "customerId": "test_customer",
            "sourceRequest":"",
            "startDate": date,
            "calculatedRate": 85 
        }
        const result = system_under_test(token, request);
        expect(result).to.be.equal(expected);
    });
    it('should return the expected value', function() {
        const request = {
            "userId": "test_user",
            "hoursLogged": 10,
            "customerId": "test_customer"
        }
        const date = new Date()
        const expected = {
            "userId": "test_user",
            "hoursLogged": 10,
            "customerId": "test_customer",
            "sourceRequest":"",
            "startDate": date,
            "calculatedRate": 85 
        }
        const result = system_under_test(token, request);
        expect(result.userId).to.exist
        expect(result.userId).to.equal('test_user');
        expect(result.hoursLogged).to.exist
        expect(result.hoursLogged).to.equal(10);
        expect(result.customerId).to.exist
        expect(result.customerId).to.equal("test_customer");
        expect(result.sourceRequest).to.exist
        expect(result.sourceRequest).to.be.a('string');
        expect(result.startDate).to.exist
        expect(result.startDate).to.be.a('date');
        expect(result.calculatedRate).to.exist
        expect(result.calculatedRate).to.equal(85);
        
    });
});
