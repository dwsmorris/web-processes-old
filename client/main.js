/*globals require*/

require({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js",
		"worker2": "js/worker2.js",
		"worker1txt": "txt/worker1txt.txt",
		"mediator": "js/mediator"
	},
	"shim": {
	}
}, [
	"worker!worker1",
	"worker!worker2",
	"text!worker1txt",
	"mediator"
], function (
	worker1,
	worker2,
	worker1txt,
	mediator
) {
	mediator({
		worker1: worker1,
		worker2: worker2
	}, {
		data: {
			to: "worker1",
			from: "main"
		}
	});
});