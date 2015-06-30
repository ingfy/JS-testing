(function (exports) {
    function Bitmap(width, height) {
        this.width = width;
        this.height = height;
        this.pixels = [];
    };

    Bitmap.fromCanvas = function (canvas) {
        var context = canvas.getContext('2d');

        var id = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = id.data;
        var bitmap = new Bitmap(id.width, id.height);

        bitmap.loadImageData(data);

        return bitmap;
    };

    Bitmap.prototype.paintTo = function (canvas) {
        var context = canvas.getContext('2d');

        var id = new ImageData(canvas.width, canvas.height);

        this.dumpImageData(id.data);

        context.putImageData(id, 0, 0);
    };

    Bitmap.prototype.loadImageData = function (data) {
        for (var i = 0; i < data.length; i += 4) {
            var pixel = new Pixel(data[i], data[i + 1], data[i + 2]);
            var x = (i / 4) % this.width;
            var y = ~~((i / 4) / this.width);
            this.addPixel(x, y, pixel);
        }
    };

    Bitmap.prototype.dumpImageData = function (data) {
        var w = this.width;

        this.allPixels().forEach(function (position) {
            var i = (position.x + position.y * w) * 4;
            data[i + 0] = position.pixel.red;
            data[i + 1] = position.pixel.green;
            data[i + 2] = position.pixel.blue;
            data[i + 3] = 255;
        });
    };

    Bitmap.prototype.allPixels = function () {
        var pixels = [];

        for (var x in this.pixels) {
            for (var y in this.pixels) {
                if (this.pixels[x][y])
                    pixels.push({x: ~~x, y: ~~y, pixel: this.pixels[x][y]});
            }
        }

        return pixels;
    };

    Bitmap.prototype.invert = function () {
        var result = new Bitmap(this.width, this.height);

        this.allPixels().forEach(function (position) {
            result.addPixel(position.x, position.y, position.pixel.invert());
        });

        return result;
    };

    Bitmap.prototype.addPixel = function(x, y, pixel) {
        if (x >= this.width || x < 0 || y >= this.height || y < 0)
            throw new Error('Pixel at (' + x + ', ' + y + ') out of bounds. Bitmap dimensions: (' + this.width + ', ' + this.height + ').');

        this.pixels[x] = this.pixels[x] || [];
        this.pixels[x][y] = pixel;
    };

    Bitmap.prototype.isComplete = function () {
        return this.allPixels().length == this.width * this.height;
    };

    exports.Bitmap = Bitmap;
}(window));
