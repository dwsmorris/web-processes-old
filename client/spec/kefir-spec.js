/*globals define, describe, it, expect*/

define([
	"jasmine",
	"kefir",
	"underscore"
], function (
	jasmine,
	kefir,
	_
) {
	jasmine.describe("kefir", function () {
		jasmine.describe("with throttled, chained sequence", function () {
			var numbers = [];

			jasmine.beforeEach(function (done) {
				kefir.sequentially(100, [1, 2, 3]).map(function(value) {
					return value * 2;
				}).filter(function(value) {
					return value !== 4;
				}).onValue(_.bind(numbers.push, numbers)).onEnd(done);
			});

			jasmine.it("generates output", function () {
				jasmine.expect(numbers).toEqual([2, 6]);
			});
		});
	});
});

