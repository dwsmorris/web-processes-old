/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"worker1": "js/worker1.js"
	},
	"map": {
		"*": {
			"worker": "dependencies/worker/worker"
		}
	},
	"shim": {
	}
});

require([
	"worker!worker1"
], function (
	worker
) {
	//var blob = new Blob([worker1Text]);

	//var worker = new Worker(window.URL.createObjectURL(blob));
	worker.onmessage = function (e) {
		console.log("Received: " + e.data);
	}
	worker.postMessage({}); // Start the worker.
});