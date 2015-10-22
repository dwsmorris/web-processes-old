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
		"underscore-contrib": "dependencies/underscore-contrib/dist/underscore-contrib",
		"underscore-contribText": "dependencies/underscore-contrib/dist/underscore-contrib.js",
		"matches": "dependencies/matchesjs/matches",
		"matchesText": "dependencies/matchesjs/matches.js"
	},
	"shim": {
		"underscore-contrib": {
			"deps": ["underscore"],
			"exports": "_"
		}
	}
}, [
	"worker!worker1",
	"worker!worker2",
	"text!worker1txt",
	"mediator",
	"underscore",
	"text!underscoreText",
	"text!underscore-contribText",
	"text!matchesText",
	"matches"
], function (
	worker1,
	worker2,
	worker1txt,
	mediator,
	underscore,
	underscoreText,
	underscoreContribText,
	matchesText
) {
	mediator({
		worker1: {
			code: worker1
		},
		worker2: {
			code: worker2,
			dependencies: [underscoreText, underscoreContribText, matchesText]
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
		},
		"...": function () {
			return 42;
		}
	});

	console.log(twoAs([1, 2])); // TODO: returns 1. should fail match!
});