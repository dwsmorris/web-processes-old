/*globals define, describe, it, expect*/

define([
	"jasmine",
	"underscore",
	"ramda"
], function (
	jasmine,
	_,
	R
) {
	jasmine.describe("ramda", function () {
		jasmine.it("supports mult4 transducer", function () {
			var listxf = {
				'@@transducer/step': function (acc, x) { return acc.concat([x]); },
				'@@transducer/init': function () { return []; },
				'@@transducer/result': function (x) { return x; }
			};
			var addxf = {
				'@@transducer/step': function (acc, x) { return acc + x; },
				'@@transducer/init': function () { return 0; },
				'@@transducer/result': function (x) { return x; }
			};

			var toxf = function (fn) {
				return function (xf) {
					return {
						'@@transducer/step': function (acc, x) { return xf['@@transducer/step'](acc, fn(x)); },
						'@@transducer/result': xf['@@transducer/result']
					};
				};
			};

			jasmine.expect(R.transduce(R.compose(R.take(2), toxf(R.add(1))), listxf, [], function () {
				var value = 0;

				var result = {
					value: value,
					next: function () {
						value += 1;
						return _.merge({}, result, {
							value: value
						});
					},
					done: false
				};

				return result;
			}())).toEqual([2, 3]);

			jasmine.expect(R.transduce(R.compose(R.take(2), toxf(R.add(1))), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([2, 3]);
			jasmine.expect(R.transduce(R.compose(R.filter(function (x) { return x % 2 === 0; }), toxf(R.add(1))), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([3, 5, 7]);
			jasmine.expect(R.transduce(R.filter(function (x) { return x % 2 === 0; }), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([2, 4, 6]);
			jasmine.expect(R.transduce(toxf(R.add(1)), listxf, [], [1, 2, 3, 4])).toEqual([2, 3, 4, 5]);
			jasmine.expect(R.transduce(toxf(R.multiply(4)), listxf, [], [1, 2, 3, 4])).toEqual([4, 8, 12, 16]);
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

