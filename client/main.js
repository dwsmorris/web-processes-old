﻿/*globals require*/

require.config({
	"baseUrl": "./",
	"paths": {
		"worker": "dependencies/worker/worker",
		"text": "dependencies/text/text",
		"worker1": "js/worker1.js",
		"worker1txt": "txt/worker1txt.txt",
		"simple": "simple"
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

	var url = document.location.href;
	var index = url.indexOf('index.html');
	if (index != -1) {
		url = url.substring(0, index);
	}

	worker.postMessage({
		url: url
	}); // Start the worker.
});