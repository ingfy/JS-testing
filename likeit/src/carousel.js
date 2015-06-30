var Promise = require('bluebird');

function Carousel(size) {
    this.current = 0;
    this.size = size;
};

var _STEP = 10;
function delayAnswer(update, result, timeout, resolve) {
    if (timeout === undefined) {
        timeout = 500 + Math.random() * 500;

        return new Promise(function (resolve) {
            delayAnswer(update, result, timeout, resolve);
        });
    }

    if (update) update(_STEP);

    if (timeout < _STEP) {
        resolve(result);
    } else {
        setTimeout(function () {
            delayAnswer(update, result, timeout - _STEP, resolve);
        }, _STEP);
    }
};

Carousel.prototype.slowNext = function (update) {
    return delayAnswer(update, this.next());
};

Carousel.prototype.slowPrev = function (update) {
    return delayAnswer(update, this.prev());
};

Carousel.prototype.next = function () {
    if (++this.current >= this.size) {
        this.current = 0;
    }

    return this.current;
};

Carousel.prototype.prev = function () {
    if (--this.current < 0) {
        this.current = this.size - 1;
    }

    return this.current;
};

module.exports = {
    Carousel: Carousel
};
