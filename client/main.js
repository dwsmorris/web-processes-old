/*globals require, matches, console*/

require({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js",
		"worker2": "js/worker2.js",
		"worker1txt": "txt/worker1txt.txt",
		"mediator": "js/mediator",
		"underscore": "dependencies/lodash/lodash",
		"underscoreText": "dependencies/lodash/lodash.js",
		"matches": "dependencies/matchesjs/matches",
		"matchesText": "dependencies/matchesjs/matches.js"
	},
	"shim": {
	}
}, [
	"worker!worker1",
	"worker!worker2",
	"text!worker1txt",
	"mediator",
	"underscore",
	"text!underscoreText",
	"text!matchesText",
	"matches"
], function (
	worker1,
	worker2,
	worker1txt,
	mediator,
	underscore,
	underscoreText,
	matchesText
) {
	mediator({
		worker1: {
			code: worker1
		},
		worker2: {
			code: worker2,
			dependencies: [underscoreText, matchesText]
		}
	}, {
		data: {
			to: "worker1",
			from: "main"
		}
	});

	var twoAs = matches.pattern({
		"[a, a]": function (a) {
			return a;
		}
	});

	console.log(twoAs([1, 1]));
	console.log(twoAs([1, 2])); // TODO: returns 1. should fail match!
});