﻿/*globals postMessage*/

addEventListener("message", function (e) {
	if (e.data.dependencies) {
		e.data.dependencies.forEach(function (dependency) {
			eval(dependency);
		});
	}
	if (e.data.from === "worker1") {
		var twoAs = matches.pattern({
			"[a, a]": function (a) {
				return a;
			}
		});

		postMessage({
			to: "worker1",
			from: "worker2",
			contents: "msg from worker 2: sum([1,2,3,4]) = " + _.reduce(_.cons(1, [2, 3, 4]), function (acc, value) {
				return acc + value;
			}, 0) + "; twoAs([1, 1]) = " + twoAs([1, 1])
		});
	}
});