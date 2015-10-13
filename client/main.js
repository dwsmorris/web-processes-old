/*globals require*/

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
		"underscoreText": "dependencies/lodash/lodash.js"
	},
	"shim": {
	}
}, [
	"worker!worker1",
	"worker!worker2",
	"text!worker1txt",
	"mediator",
	"underscore",
	"text!underscoreText"
], function (
	worker1,
	worker2,
	worker1txt,
	mediator,
	underscore,
	underscoreText
) {
	mediator({
		worker1: {
			code: worker1
		},
		worker2: {
			code: worker2,
			dependencies: [underscoreText]
		}
	}, {
		data: {
			to: "worker1",
			from: "main"
		}
	});
});