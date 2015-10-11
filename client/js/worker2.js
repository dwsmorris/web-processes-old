self.onmessage = function (e) {
	self.postMessage({
		message: 'msg from worker 2'
	});
};
