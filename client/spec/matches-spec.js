/*globals define, describe, it, expect*/

define([
	"jasmine",
	"matches",
	"underscore"
], function (
	jasmine,
	matches,
	_
) {
	jasmine.describe("matches.pattern", function () {
		jasmine.it("matches a symbol", function () {
			var fn = matches.pattern({
				"a": function (a) { return a; },
				"...": function () { return "No match!"; }
			});

			jasmine.expect(fn(1)).toBe(1);
		});

		jasmine.it("throws an exception when patterns are exhausted", function () {
			var fn = matches.pattern({
				"[]": function () { return 2; }
			});

			expect(_.partial(fn, 7)).toThrowError(TypeError, "All patterns exhausted");
		});

		jasmine.it("successfully defaults to otherwise", function () {
			var fn = matches.pattern({
				"a": function (a) { return a; },
				"...": function () { return 6; }
			});

			jasmine.expect(fn()).toBe(6);
		});

		jasmine.it("deconstructs a list", function () {
			var fn = matches.pattern({
				"[a, b, c]": function (a, b, c) { return a + b + c; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([1, 2, 3])).toBe(6);
		});

		jasmine.it("matches integers in a list", function () {
			var fn = matches.pattern({
				"[a, 2, b]": function (a, b) { return a + b; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([1, 2, 3])).toBe(4);
		});

		jasmine.it("rejects integer mismatch in a list", function () {
			var fn = matches.pattern({
				"[a, 1, b]": function (a, b) { return a + b; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([1, 2, 3])).toBe(0);
		});

		jasmine.it("rejects mismatched number of args in a list", function () {
			var fn = matches.pattern({
				"[a, b]": function (a, b) { return a + b; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([1, 2, 3])).toBe(0);
		});

		jasmine.it("matches embedded list in a list", function () {
			var fn = matches.pattern({
				"[a]": function (a) { return a; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([[1, 2, 3]])).toEqual([1, 2, 3]);
		});

		jasmine.it("rejects mismatched args in embedded list", function () {
			var fn = matches.pattern({
				"[[a]]": function (a) { return a; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([[1, 2, 3]])).toBe(0);
		});

		jasmine.it("ignores _'s as any wildcard", function () {
			var fn = matches.pattern({
				"[1, _, _]": function () { return 12; },
				"...": function () { return 0; }
			});

			jasmine.expect(fn([1, "cat", "dog"])).toBe(12);
		});

		// #1
		jasmine.xit("pattern enforces matching identical symbols", function () {
			var fn = matches.pattern({
				"[a, a]": function (a) {
					return a;
				},
				"...": function () {
					return 42;
				}
			});

			jasmine.expect(fn([1, 2])).toBe(42);
		});

		jasmine.it("does not capture variables", function () {
			var a = 1;
			var fn = matches.pattern({
				"[1, a, 3]": function (a) { return a; },
				"...": function () { return 42; }
			});

			fn([1, 2, 3]);

			jasmine.expect(a).toBe(1);
		});

		jasmine.it("supports simple recursive factorial", function () {
			var factorial = matches.pattern({
				"0": function () { return 1; },
				"n": function (n) { return n * factorial(n - 1); }
			});

			jasmine.expect(factorial(3)).toBe(6);
		});

		jasmine.it("implements guards as custom pattern functions", function () {
			var whatIs = matches.pattern(function (args) {
				return _.isNumber(args[0]) ? [args[0]] : false;
			}, function (number) { return number + " is a number"; }).alt(matches.pattern(function (args) {
				return _.isArray(args[0]) ? [args[0]] : false;
			}, function (array) { return JSON.stringify(array) + " is an array"; }));

			jasmine.expect(whatIs(2)).toBe("2 is a number");
			jasmine.expect(whatIs([3, 4])).toBe("[3,4] is an array");
		});

		jasmine.it("implements factorial with negative range guard", function () {
			var factorial = matches.pattern({
				"0": function () { return 1; }
			}).alt(matches.pattern(function(args) {
				if ()
				"n": function (n) { return n * factorial(n - 1); }
			});

			jasmine.expect(factorial(3)).toBe(6);
		});
	});
});

