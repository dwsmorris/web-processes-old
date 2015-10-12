self.addEventListener("message", function (e) {
	var worker2 = eval(e.data.worker2);

	worker2.addEventListener("message", function (e) {
		self.postMessage({
			message: "msg from worker 1: " + e.data.message
		});
	});

	worker2.postMessage({});
});