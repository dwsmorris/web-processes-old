/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js"
	},
	"shim": {
	},
	"urlArgs": ("bust=" + new Date()["getTime"]())
});

require([
	"text!worker1"
], function (
	worker1Text
) {
	var blob = new Blob([worker1Text]);

	var worker = new Worker(window.URL.createObjectURL(blob));
	worker.onmessage = function (e) {
		console.log("Received: " + e.data);
	}
	worker.postMessage({}); // Start the worker.
});