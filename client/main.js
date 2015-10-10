/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js",
		"worker1txt": "txt/worker1txt.txt"
	},
	"shim": {
	}
});

require([
	"worker!worker1",
	"text!worker1txt"
], function (
	worker,
	worker1txt
) {
	worker.onmessage = function (e) {
		console.log("Received: " + e.data + " " + worker1txt);
	}
	worker.postMessage({}); // Start the worker.
});