/*globals define, console*/

define(["underscore"], function (_) {
	return function (processCode, startMessage) {
		var processes = {};

		var onMessage = function (message) {
			if (message.data.to === "output") {
				console.log("Output received: " + message.data.contents);
			} else {
				if (!processes[message.data.to]) {
					processes[message.data.to] = eval(processCode[message.data.to].code);

					processes[message.data.to].addEventListener("message", onMessage);

					var dependencies = processCode[message.data.to].dependencies;
					if (_.isArray(dependencies)) {
						message.data.dependencies = dependencies;
					}
				}

				processes[message.data.to].postMessage(message.data);
			}
		};

		onMessage(startMessage);
	};
});