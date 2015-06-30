var counting = require('../src/counting');

var assert = require('chai').assert;
var should = require('chai').should();
var expect = require('chai').expect;

describe('counting', function () {
    describe('#increment()', function () {
        it('should return a number', function () {
            counting.increment(1).should.be.a('number');
        });

        it('should increase the value with 1', function () {
            var value = 1;
            var nextValue = counting.increment(value);

            assert.equal(2, nextValue);
        });

        it('should not increase the value with 2', function () {
            counting.increment(3).should.not.equal(5);
        });

        it('should not decrease the value', function () {
            expect(counting.increment(5)).to.not.equal(4);
        });
    });

    describe('#decrement()', function () {
        it('should decrease the value with 1', function () {
            var value = 2;
            var nextValue = counting.decrement(value);

            assert.equal(1, nextValue);
        });
    });
});
