var expect = chai.expect;

describe('Bitmap', function () {
    describe('new #(width, height)', function () {
        it('should add dimension properties to the object', function () {
            var image = new Bitmap(1, 2);

            expect(image.width).to.equal(1);
            expect(image.height).to.equal(2);
        });
    });

    describe('#addPixel(x, y, pixel)', function () {
        it('should not accept out of bounds position', function () {
            var image = new Bitmap(2, 5);
            var pixel = new Pixel(1, 2, 3);

            expect(function () { image.addPixel(2, 0, pixel); }).to.Throw();
            expect(function () { image.addPixel(0, 5, pixel); }).to.Throw();
            expect(function () { image.addPixel(-1, 0, pixel); }).to.Throw();
            expect(function () { image.addPixel(0, -1, pixel); }).to.Throw();
        });
    });

    describe('#isComplete()', function () {
        it('should return true if all positions are filled', function () {
            var image = new Bitmap(2, 2);
            image.addPixel(0, 0, new Pixel(0, 0, 0));
            image.addPixel(1, 0, new Pixel(1, 1, 1));
            image.addPixel(0, 1, new Pixel(2, 2, 2));
            image.addPixel(1, 1, new Pixel(3, 3, 3));

            expect(image.isComplete()).to.equal(true);
        });

        it('should return false if not all positions are filled', function () {
            var image = new Bitmap(2, 2);
            image.addPixel(0, 0, new Pixel(0, 0, 0));
            image.addPixel(1, 0, new Pixel(1, 1, 1));
            // Missing (0, 1)
            image.addPixel(1, 1, new Pixel(3, 3, 3));

            expect(image.isComplete()).to.equal(false);
        });
    });

    describe('#invertPixels()', function () {
        it('should invert every pixel', function () {
            var image = new Bitmap(1, 1);
            image.addPixel(0, 0, new Pixel(0, 127.5, 255));

            var result = image.invert();

            var pixel = result.pixels[0][0];

            expect(pixel.red).to.equal(255);
            expect(pixel.green).to.equal(127.5);
            expect(pixel.blue).to.equal(0);
        });
    });

    describe('#loadImageData(array)', function () {
        it('should correctly load a 2x2 image array', function () {
            var image = new Bitmap(2, 2);
            var data = [1, 2, 3, 1, 4, 5, 6, 1, 7, 8, 9, 1, 10, 11, 12, 1];

            image.loadImageData(data);

            expect(image.pixels[0][0].red).to.equal(1);
            expect(image.pixels[0][0].green).to.equal(2);
            expect(image.pixels[0][0].blue).to.equal(3);
            expect(image.pixels[1][0].red).to.equal(4);
            expect(image.pixels[1][0].green).to.equal(5);
            expect(image.pixels[1][0].blue).to.equal(6);
            expect(image.pixels[0][1].red).to.equal(7);
            expect(image.pixels[0][1].green).to.equal(8);
            expect(image.pixels[0][1].blue).to.equal(9);
            expect(image.pixels[1][1].red).to.equal(10);
            expect(image.pixels[1][1].green).to.equal(11);
            expect(image.pixels[1][1].blue).to.equal(12);
        });
    });

    describe('#dumpImageData()', function () {
        it('should correctly dump data form a 2x2 image', function () {
            var image = new Bitmap(2, 2);
            image.addPixel(0, 0, new Pixel(1, 2, 3));
            image.addPixel(1, 0, new Pixel(4, 5, 6));
            image.addPixel(0, 1, new Pixel(7, 8, 9));
            image.addPixel(1, 1, new Pixel(10, 11, 12));

            var data = [];

            image.dumpImageData(data);

            expect(data[0]).to.equal(1);
            expect(data[1]).to.equal(2);
            expect(data[2]).to.equal(3);
            expect(data[4]).to.equal(4);
            expect(data[5]).to.equal(5);
            expect(data[6]).to.equal(6);
            expect(data[8]).to.equal(7);
            expect(data[9]).to.equal(8);
            expect(data[10]).to.equal(9);
            expect(data[12]).to.equal(10);
            expect(data[13]).to.equal(11);
            expect(data[14]).to.equal(12);
        });
    });

    describe('canvas methods', function () {
        function mockCanvas(width, height) {
            var getImageDataStub = sinon.stub().returns({
                width: width,
                height: height,
                data: (function () {
                    var data = [];
                    for (var i = 0, c = 1; i < width * height; i++) {
                        var j = i * 4;
                        data[j + 0] = c++;
                        data[j + 1] = c++;
                        data[j + 2] = c++;
                        data[j + 3] = 255;
                    }
                    return data;
                }())
            });

            var putImageDataSpy = sinon.spy();

            return {
                mock: {
                    width: width,
                    height: width,
                    getContext: sinon.stub().withArgs('2d').returns({
                        getImageData: getImageDataStub,
                        putImageData: putImageDataSpy
                    })
                },
                getImageDataStub: getImageDataStub,
                putImageDataSpy: putImageDataSpy
            };
        }

        describe('#fromCanvas(canvas)', function () {
            it('should create a 2x2 bitmap from the canvas', function () {
                var canvas = mockCanvas(2, 2);

                var bitmap = Bitmap.fromCanvas(canvas.mock);

                expect(bitmap.pixels[0][0].red).to.equal(1);
                expect(bitmap.pixels[0][0].green).to.equal(2);
                expect(bitmap.pixels[0][0].blue).to.equal(3);
                expect(bitmap.pixels[1][0].red).to.equal(4);
                expect(bitmap.pixels[1][0].green).to.equal(5);
                expect(bitmap.pixels[1][0].blue).to.equal(6);
                expect(bitmap.pixels[0][1].red).to.equal(7);
                expect(bitmap.pixels[0][1].green).to.equal(8);
                expect(bitmap.pixels[0][1].blue).to.equal(9);
                expect(bitmap.pixels[1][1].red).to.equal(10);
                expect(bitmap.pixels[1][1].green).to.equal(11);
                expect(bitmap.pixels[1][1].blue).to.equal(12);
            });
        });

        describe('#paintTo(canvas)', function () {
            it('should dump a 2x2 bitmap to the canvas', function () {
                var canvas = mockCanvas(2, 2);

                var bitmap = new Bitmap(2, 2);

                bitmap.addPixel(0, 0, new Pixel(1, 2, 3));
                bitmap.addPixel(1, 0, new Pixel(4, 5, 6));
                bitmap.addPixel(0, 1, new Pixel(7, 8, 9));
                bitmap.addPixel(1, 1, new Pixel(10, 11, 12));

                bitmap.paintTo(canvas.mock);

                expect(canvas.putImageDataSpy.calledOnce).to.be.true;

                var call = canvas.putImageDataSpy.getCall(0);

                var id = call.args[0];

                expect(id).to.be.instanceof(ImageData);
                expect(id.width).to.equal(2);
                expect(id.height).to.equal(2);
                expect(id.data.length).to.equal(2*2*4);
                expect(id.data[0]).to.equal(1);
                expect(id.data[1]).to.equal(2);
                expect(id.data[2]).to.equal(3);
                expect(id.data[4]).to.equal(4);
                expect(id.data[5]).to.equal(5);
                expect(id.data[6]).to.equal(6);
                expect(id.data[8]).to.equal(7);
                expect(id.data[9]).to.equal(8);
                expect(id.data[10]).to.equal(9);
                expect(id.data[12]).to.equal(10);
                expect(id.data[13]).to.equal(11);
                expect(id.data[14]).to.equal(12);
            });
        });
    });
});
