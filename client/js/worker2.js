/*globals postMessage*/

addEventListener("message", function (e) {
	postMessage({
		to: e.data.from,
		from: "worker2",
		contents: "msg from worker 2"
	});
});