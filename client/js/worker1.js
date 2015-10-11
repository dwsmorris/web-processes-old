//require(["require"], function (require) {
	self.onmessage = function (e) {
		importScripts(e.data.url + "dependencies/requirejs/require.js");
		importScripts(e.data.url + "js/hello-world.js");

		//console.log("hello");
		self.postMessage('msg from worker: ' + helloWorld());

		require({
			baseUrl: e.data.url
		}, ["js/anon/blue"], function (blue) {
			postMessage(blue.name);
		});
	};
//});
