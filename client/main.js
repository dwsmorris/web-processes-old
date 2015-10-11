var worker1 = new Worker("js/worker1.js");

worker1.onmessage = function (e) {
	console.log("Received: " + e.data.message);
};

worker1.postMessage({}); // Start the worker.
