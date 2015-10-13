/*globals define, console*/

define(function () {
	return function (processCode, startMessage) {
		var processes = {};

		var onMessage = function (message) {
			if (message.data.to === "output") {
				console.log("Output received: " + message.data.contents);
			} else {
				if (!processes[message.data.to]) {
					processes[message.data.to] = eval(processCode[message.data.to]);

					processes[message.data.to].addEventListener("message", onMessage);
				}

				processes[message.data.to].postMessage(message.data);
			}
		};

		onMessage(startMessage);
	};
});