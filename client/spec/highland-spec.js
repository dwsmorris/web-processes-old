/*globals define, describe, it, expect*/

define([
	"jasmine",
	"highland"
], function (
	jasmine,
	_
) {
	jasmine.describe("highland", function () {
		var integers = _(function () {
			var value = 0;

			return function (push, next) {
				push(value);
				value += 1;
				next();
			};
		}());

		jasmine.xit("supports infinite arrays", function () {
			jasmine.expect(integers.take(3)).toEqual([0, 1, 2]);
		});
	});
});

