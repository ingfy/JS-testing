var expect = chai.expect;

describe('Pixel', function () {
    describe('new #()', function () {
        it('should add color properties to the object', function () {
            var pixel = new Pixel(1, 2, 3);

            expect(pixel.red).to.equal(1);
            expect(pixel.green).to.equal(2);
            expect(pixel.blue).to.equal(3);
        });

        it('should not accept invalid pixel values', function () {
            expect(function () { new Pixel(-1, 0, 0); }).to.Throw();
            expect(function () { new Pixel(0, 256, 0); }).to.Throw();
            expect(function () { new Pixel(0, 0, -255); }).to.Throw();
        });
    });

    describe('#invert()', function () {
        it('should return a new Pixel', function () {
            expect(new Pixel(0, 0, 0).invert()).to.be.an.instanceof(Pixel);
        });

        it('should invert the color values', function () {
            expect(new Pixel(0, 0, 0).invert().red).to.equal(255);
            expect(new Pixel(0, 0, 0).invert().green).to.equal(255);
            expect(new Pixel(0, 0, 0).invert().blue).to.equal(255);
        });
    });
});
