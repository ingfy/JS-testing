describe('Invert it!', function () {
    beforeEach(function () {
        browser.get('http://localhost:8000/');
    });

    describe('image select', function () {
        it('should have options', function () {
            var select = element(by.model('image'));
            var options = select.all(by.css('option[value]'));

            expect(options.count()).toBe(5);
        });
    });
});
