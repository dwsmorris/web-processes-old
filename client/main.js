/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
	},
	"shim": {
	}
});

require([
], function () {
	var blob = new Blob([document.querySelector('#worker1').textContent]);

	var worker = new Worker(window.URL.createObjectURL(blob));
	worker.onmessage = function (e) {
		console.log("Received: " + e.data);
	}
	worker.postMessage({}); // Start the worker.
});