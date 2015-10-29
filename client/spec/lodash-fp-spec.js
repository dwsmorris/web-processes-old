/*globals define, describe, it, expect*/

define([
	"jasmine",
	"lodashFp"
], function (
	jasmine,
	_
) {
	jasmine.describe("lodash-fp", function () {
		jasmine.xit("supports infinite arrays", function () {
			jasmine.expect(_.chain([1]).push(2).take(2).value()).toEqual([0, 1, 2]);
		});
		/*
		var integers = function (n) {
			return la.create(function () {
				return la.cons(n, integers(n + 1));
			});
		};

		jasmine.it("supports chained infinite lists", function () {
			var values = la.all(la.take(5, la.map(function (n) { return n + 1; }, integers(1))));

			jasmine.expect(values).toEqual([2, 3, 4, 5, 6]);
		});

		jasmine.it("supports cycling and zip", function () {
			var cycleGreenWhite = function (white) {
				return la.create(function () {
					return la.cons(white ? "white" : "green", cycleGreenWhite(!white));
				});
			};

			var values = la.all(la.take(3, la.zip(cycleGreenWhite(), integers(1))));

			jasmine.expect(values).toEqual([["green", 1], ["white", 2], ["green", 3]]);
		});

		jasmine.it("supports generator function", function () {
			var trueGenerator = function () {
				return la.create(function () {
					return la.cons(true, trueGenerator());
				});
			};

			jasmine.expect(la.all(la.take(2, trueGenerator()))).toEqual([true, true]);
		});

		jasmine.it("supports iterating generator", function () {
			var squareResult = function (value) {
				return la.create(function () {
					return la.cons(value, squareResult(value * value));
				});
			};

			jasmine.expect(la.all(la.take(4, squareResult(2)))).toEqual([2, 4, 16, 256]);
		});

		jasmine.it("demonstrates unfolding with fibonacci", function () {
			var fibonacci = function (x, y) {
				return la.create(function () {
					return la.cons(x, fibonacci(y, x + y));
				});
			};

			jasmine.expect(la.all(la.take(7, fibonacci(0, 1)))).toEqual([0, 1, 1, 2, 3, 5, 8]);
		});
		*/
	});
});

