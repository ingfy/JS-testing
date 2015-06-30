var Carousel = require('../src/carousel').Carousel;

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

var expect = chai.expect;

describe('Carousel', function () {
    describe('#next()', function () {
        it('should return the next index', function () {
            var carousel = new Carousel(5);

            expect(carousel.next()).to.equal(1);
        });

        it('should return the first when nearing the end', function () {
            var carousel = new Carousel(2);

            var once = carousel.next();
            var twice = carousel.next();

            expect(twice).to.equal(0);
        });
    });

    describe('#slowNext()', function () {
        it('shuld return the next index', function () {
            var carousel = new Carousel(5);

            return carousel.slowNext().should.eventually.equal(1);
        });

        it('should return the first when nearing the end', function () {
            var carousel = new Carousel(2);

            this.timeout(0); // Disable Mocha timeout

            return carousel.slowNext()
                .then(function () {
                    return carousel.slowNext();
                }).should.eventually.equal(0);
        });
    });

    describe('#prev()', function () {
        it('should return the previous index', function () {
            var carousel = new Carousel(5);

            carousel.current = 3;

            expect(carousel.prev()).to.equal(2);
        });

        it('should return the last when nearing the start', function () {
            var carousel = new Carousel(2);

            expect(carousel.prev()).to.equal(1);
        });
    });

    describe('#slowNext()', function () {
        it('should return the previous index', function () {
            var carousel = new Carousel(5);

            carousel.current = 3;

            return carousel.slowPrev().should.eventually.equal(2);
        });

        it('should return the last when nearing the start', function () {
            var carousel = new Carousel(2);

            return carousel.slowPrev().should.eventually.equal(1);
        });
    });
});
