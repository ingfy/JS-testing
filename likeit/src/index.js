var ko = require('knockout');
var ImageViewModel = require('./image').ViewModel;
var Carousel = require('./carousel').Carousel;

var images = ['cute-1.jpg', 'cute-2.jpg' , 'cute-3.jpg' , 'cute-4.jpg' , 'cute-5.jpg' , 'cute-7.jpg' , 'cute-8.jpg' , 'cute-9.jpg', 'cute-10.jpg' , 'cute-11.jpg' , 'cute-12.jpg' , 'cute-13.jpg' , 'cute-14.jpg' , 'cute-16.jpg' , 'cute-17.jpg' , 'cute-18.jpg' , 'cute-19.jpg'];

function ViewModel() {
    this.carousel = new Carousel(images.length);
    this.currentImage = ko.observable(new ImageViewModel(images[this.carousel.current]));
    this.wait = ko.observable(undefined);
}

ViewModel.prototype.refresh = function () {
    this.currentImage(new ImageViewModel(images[this.carousel.current]));
};

ViewModel.prototype.next = function () {
    this.wait(0);
    var self = this;
    var updateWait = function () {
        self.wait(self.wait() + 10);
    };
    this.carousel.slowNext(updateWait)
        .then(function () {
            self.refresh();
        });
};

ViewModel.prototype.prev = function () {
    this.wait(0);
    var self = this;
    var updateWait = function () {
        self.wait(self.wait() + 10);
    };
    this.carousel.slowPrev(updateWait)
        .then(function () {
            self.refresh();
        });
};

ko.applyBindings(new ViewModel());
