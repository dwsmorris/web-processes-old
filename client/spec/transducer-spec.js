/*globals define, describe, it, expect*/

define([
	"jasmine"
], function (
	jasmine
) {
	jasmine.describe("transducer example", function () {
		var transformer = function (reducingFunction) {
			return {
				init: function () { // start with initial value
					return 1;
				},

				step: reducingFunction, // pass result to next iteration

				result: function (result) { // output last computation
					return result;
				}
			}
		};

		jasmine.it("demonstrates use of transformer with reduce", function () {
			var input = [1, 2, 3, 4];

			var xf = transformer(function (x, y) { return x + y; });
			var output = input.reduce(xf.step, xf.init());

			jasmine.expect(output).toBe(11);
		});
	});
});

