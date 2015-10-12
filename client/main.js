/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js",
		"worker2": "js/worker2.js",
		"worker1txt": "txt/worker1txt.txt",
		"simple": "simple"
	},
	"shim": {
	}
});

require([
	"worker!worker1",
	"worker!worker2",
	"text!worker1txt"
], function (
	worker1,
	worker2,
	worker1txt
) {
	var worker = eval(worker1);

	worker.onmessage = function (e) {
		console.log("Received: " + e.data.message + " " + worker1txt);
	}

	var url = document.location.href;
	var index = url.indexOf('index.html');
	if (index != -1) {
		url = url.substring(0, index);
	}

	worker.postMessage({
		url: url,
		worker2: worker2
	}); // Start the worker.
});