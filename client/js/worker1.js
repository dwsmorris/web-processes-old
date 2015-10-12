self.addEventListener("message", function (e) {
	self.postMessage('msg from' + " worker 1");
});