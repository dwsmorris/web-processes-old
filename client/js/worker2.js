/*globals postMessage*/

addEventListener("message", function (e) {
	if (e.data.dependencies) {
		e.data.dependencies.forEach(function (dependency) {
			eval(dependency);
		});
	}
	if (e.data.from === "worker1") {
		postMessage({
			to: "worker1",
			from: "worker2",
			contents: "msg from worker 2: sum([1,2,3,4]) = " + _.reduce([1, 2, 3, 4], function (acc, value) {
				return acc + value;
			}, 0)
		});
	}
});