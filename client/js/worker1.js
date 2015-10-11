self.onmessage = function (e) {
	var worker2 = new Worker("worker2.js");

	worker2.addEventListener("message", function (e) {
		self.postMessage({
			message: 'msg from worker1 : ' + e.data.message
		});
	});

	worker2.postMessage({});
};
