//require(["require"], function (require) {
	self.onmessage = function (e) {
		importScripts(e.data.url + "js/hello-world.js");

		//console.log("hello");
		self.postMessage('msg from worker: ' + helloWorld());
	};
//});
