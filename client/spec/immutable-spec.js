/*globals define, describe, it, expect*/

define([
	"jasmine",
	"immutable"
], function (
	jasmine,
	_
) {
	jasmine.describe("immutable-js", function () {
		jasmine.it("supports fromJS and toJS", function () {
			var jsObject = {a: [1, 2], b: true};
			jasmine.expect(_.fromJS(jsObject).toJS()).toEqual(jsObject);
		});

		jasmine.it("supports lazy range", function () {
			jasmine.expect(_.Range().take(3).toJS()).toEqual([0, 1, 2]);
		});

		jasmine.it("supports lazy repeat", function () {
			jasmine.expect(_.Repeat(3).take(3).toJS()).toEqual([3, 3, 3]);
		});

		jasmine.it("supports chaining infinite streams", function () {
			jasmine.expect(_.Range(1).map(function (x) { return x + 1; }).take(5).toJS()).toEqual([2, 3, 4, 5, 6]);
		});

		jasmine.it("supports cycling and zipping streams", function () {
			var greenWhiteGenerator = _.Seq((function () {
				var green = true;

				return {
					next: function () {
						return green ? "green" : "white";
						green = !green;
					}
				};
			});

			jasmine.expect(greenWhiteGenerator.take(2).toJS()).toEqual(["green", "white"]);
			jasmine.expect(greenWhiteGenerator.zip(_.Range(1)).take(3).toJS()).toEqual([["green", 1], ["white", 2], ["green", 3]]);
		});
	});
});

