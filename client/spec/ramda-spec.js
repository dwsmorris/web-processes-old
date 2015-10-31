/*globals define, describe, it, expect*/

define([
	"jasmine",
	"ramda"
], function (
	jasmine,
	R
) {
	jasmine.describe("ramda", function () {
		var infiniteGenerator = function () {
			var result = {
				value: true,
				next: function () { return result; },
				done: false
			};
		};

		var natNumGenerator = function () {
			var value = 0;

			var result = {
				value: value,
				next: function () {
					value += 1;
					return {
						value: value,
						next: result.next,
						done: false
					};
				},
				done: false
			};

			return result;
		};

		var cyclingGenerator = function (values) {
			var index = -1; // next is invoked before first value

			var result = {
				next: function () {
					index += 1;
					return {
						value: values[index % values.length],
						next: result.next,
						done: false
					};
				},
				done: false
			};

			return result;
		};

		var listxf = {
			'@@transducer/step': function (acc, x) { return acc.concat([x]); },
			'@@transducer/init': function () { return []; },
			'@@transducer/result': function (x) { return x; }
		};

		var toxf = function (fn) {
			return function (xf) {
				return {
					'@@transducer/step': function (acc, x) { return xf['@@transducer/step'](acc, fn(x)); },
					'@@transducer/result': xf['@@transducer/result'],
					'@@transducer/init': function () { return []; }
				};
			};
		};

		jasmine.it("supports infinite sequences with transducers", function () {
			jasmine.expect(R.transduce(R.compose(toxf(R.add(1)), R.take(2)), listxf, [], natNumGenerator())).toEqual([2, 3]); // needs ramda patch
			jasmine.expect(R.transduce(R.compose(R.take(2), toxf(R.add(1))), listxf, [], natNumGenerator())).toEqual([2, 3]);

			jasmine.expect(R.transduce(R.compose(R.take(2), toxf(R.add(1))), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([2, 3]);
			jasmine.expect(R.transduce(R.compose(R.filter(function (x) { return x % 2 === 0; }), toxf(R.add(1))), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([3, 5, 7]);
			jasmine.expect(R.transduce(R.filter(function (x) { return x % 2 === 0; }), listxf, [], [1, 2, 3, 4, 5, 6, 7])).toEqual([2, 4, 6]);
			jasmine.expect(R.transduce(toxf(R.add(1)), listxf, [], [1, 2, 3, 4])).toEqual([2, 3, 4, 5]);
			jasmine.expect(R.transduce(toxf(R.multiply(4)), listxf, [], [1, 2, 3, 4])).toEqual([4, 8, 12, 16]);
		});

		jasmine.it("supports cycling and zip", function () {
			var greenWhiteGenerator = cyclingGenerator(["green", "white"]);
			var greenWhiteNumbers = R.compose(natNumGenerator(), greenWhiteGenerator);

			//var gWT = R.transduce(toxf(R.identity), listxf, [], greenWhiteGenerator);
			//var nNT = R.transduce(toxf(R.identity), listxf, [], natNumGenerator());

			//jasmine.expect(R.transduce(R.take(3), listxf, [], greenWhiteNumbers)).toEqual([["green", 1], ["white", 2], ["green", 3]]);
			jasmine.expect(greenWhiteGenerator.next().value).toEqual("green");
		});

		jasmine.it("demonstrates unfolding with fibonacci", function () {
			var fibonacciGenerator = function () {
				var pair = [1, 0];
				return {
					next: function () {
						pair = [pair[1], pair[0] + pair[1]];
						return {
							value: pair[0],
							next: fibonacciGenerator.next,
							done: false
						};
					},
					done: false
				};
			};
			jasmine.expect(R.transduce(R.compose(toxf(R.add(2)), toxf(R.multiply(3)), R.take(4)), listxf, [], fibonacciGenerator())).toEqual([6, 9, 9, 12]);
			jasmine.expect(R.transduce(R.compose(R.take(4), toxf(R.multiply(3)), toxf(R.add(2))), listxf, [], fibonacciGenerator())).toEqual([2, 5, 5, 8]);
			//jasmine.expect(R.transduce(R.compose(toxf(R.add(1)), R.take(7)), listxf, [], fibonacciGenerator)).toEqual([1, 2, 2, 3, 4, 6, 9]);
		});
		/*
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

