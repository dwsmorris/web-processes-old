importScripts("../dependencies/requirejs/require.js");

self.onmessage = function (e) {
	self.postMessage('msg from worker');
};

require(["simple", "anon/blue", "func", "anon/green"], function (simple, blue, func, green) {
	postMessage(simple.color);
	postMessage(green.name);
	postMessage(func());
	postMessage(blue.name);
});