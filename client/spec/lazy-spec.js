/*globals define, describe, it, expect*/

define([
	"jasmine",
	"underscore",
	"lazy"
], function (
	jasmine,
	_,
	lazy
) {
	jasmine.describe("lazy", function () {
		jasmine.it("supports chained infinite lists", function () {
			var numbers = lazy.generate(_.identity).map(function (x) { return x + 1; }).take(5).toArray();

			jasmine.expect(numbers).toEqual([1, 2, 3, 4, 5]);
		});
	});
});

