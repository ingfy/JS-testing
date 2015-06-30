var ko = require('knockout');
var counting = require('./counting');

function ImageViewModel(src) {
    this.likes = ko.observable(0);
    this.src = src;
}

ImageViewModel.prototype.like = function () {
    this.likes(counting.increment(this.likes()));
};

ImageViewModel.prototype.dislike = function () {
    this.likes(counting.decrement(this.likes()));
};

module.exports = {
    ViewModel: ImageViewModel
};
