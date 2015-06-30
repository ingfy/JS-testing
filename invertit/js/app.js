(function () {
    var app = angular.module('app', []);

    app.service('Bitmap', function () {
        return window.Bitmap;
    });

    app.service('Pixel', function () {
        return window.Pixel;
    });

    app.directive('canvasDirective', function (Bitmap, Pixel) {
        return {
            require: '^inverterForm',
            scope: {
                selectedImage: '=',
                inverted: '='
            },
            link: function (scope, element, attributes, controller) {
                var width = element[0].width;
                var height = element[0].height;
                var context = element[0].getContext('2d');

                function invertImage() {
                    Bitmap.fromCanvas(canvas).invert().paintTo(canvas);
                }

                function drawImage() {
                    var image = scope.selectedImage;

                    context.font = '24px Arial';
                    context.fontWeight = 'bold';
                    context.textAlign = 'center';
                    context.fillStyle = 'rgba(255, 255, 255, 0.5)';
                    context.fillRect(0, height / 2 - 24, width, 48);
                    context.fillStyle = 'darkblue';
                    context.fillText('Loading...', width / 2, height / 2 + 12);
                    var path = '/assets/images/' + image;
                    var imageElement = new Image();
                    imageElement.src = path;
                    imageElement.onload = function () {
                        context.drawImage(imageElement, 0, 0, width, height);
                    };
                }

                scope.$watch('selectedImage', function (newImage, oldImage) {
                    if (newImage) {
                        drawImage();
                    }
                });

                scope.$watch('inverted', function (inverted) {
                    if (inverted && scope.selectedImage) {
                        invertImage();
                    }
                });
            }
        };
    });

    function FormController($scope) {
        $scope.images = ['cute-1.jpg', 'cute-2.jpg', 'cute-3.jpg', 'cute-4.jpg', 'cute-5.jpg'];
        $scope.image = null;
        $scope.inverted = false;
    }

    app.directive('inverterForm', function () {
        return {
            scope: true,
            controller: FormController
        };
    });
}());
