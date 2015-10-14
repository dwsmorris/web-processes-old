/*globals define, describe, it, expect*/

define([
	"jasmine",
	"matches"
], function (
	jasmine,
	matches
) {
	jasmine.describe("matches", function () {
		jasmine.it("recognises a pattern with symbol", function () {
			var fn = matches.pattern({
				"a": function (a) { return a; },
				"...": function () { return "No match!";}
			});

			jasmine.expect(fn(1)).toBe(1);
		});
	});
});

