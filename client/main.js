/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"worker1": "js/worker1.js"
	},
	"shim": {
	}
});

require([
	"worker!worker1"
], function (
	worker
) {
	var worker1 = worker();
	worker1.onmessage = function (e) {
		console.log("Received: " + e.data);
	}
	worker1.postMessage({}); // Start the worker.
});