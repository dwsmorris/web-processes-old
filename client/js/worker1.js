/*globals postMessage*/

addEventListener("message", function (e) {
	if (e.data.from === "worker2") {
		postMessage({
			to: "output",
			from: "worker1",
			contents: "relayed from worker1: " + e.data.contents
		});
	}
});

postMessage({
	to: "worker2",
	from: "worker1"
});