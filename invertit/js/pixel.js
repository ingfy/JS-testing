(function (exports) {
    function Pixel(red, green, blue) {
        [red, green, blue].forEach(validateColor);

        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    function validateColor(value) {
        if (value < 0 || value > 255) throw new Error('Invalid color value ' + value + '. Color should be in [0, 255].');
    }

    function invertColor(value) {
        return 255 - value;
    };

    Pixel.prototype.invert = function () {
        return new Pixel(
            invertColor(this.red),
            invertColor(this.green),
            invertColor(this.blue)
        );
    };

    exports.Pixel = Pixel;
}(window));
