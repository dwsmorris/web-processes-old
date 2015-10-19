/*globals require, window*/

require.config({
	baseUrl: "./",
	paths: {
		"underscore": "dependencies/lodash/lodash",
		"jasmine": "dependencies/jasmine/lib/jasmine-core/jasmine",
		"jasmine-html": "dependencies/jasmine/lib/jasmine-core/jasmine-html",
		"boot": "dependencies/jasmine/lib/jasmine-core/boot",
		"matches": "dependencies/matchesjs/matches",
		"text": "dependencies/text/text"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"text": {
			exports: "text"
		},
		'jasmine': {
			exports: 'window'
		},
		'jasmine-html': {
			deps: ['jasmine'],
			exports: 'jasmine'
		},
		'boot': {
			deps: ['jasmine-html'],
			exports: 'jasmine'
		},
		"matches": {
			exports: "matches"
		}
	}
});

// Load Jasmine - This will still create all of the normal Jasmine browser globals unless `boot.js` is re-written to use the
// AMD or UMD specs. `boot.js` will do a bunch of configuration and attach it's initializers to `window.onload()`. Because
// we are using RequireJS `window.onload()` has already been triggered so we have to manually call it again. This will
// initialize the HTML Reporter and execute the environment.
require(['boot'], function () {
	// Load the specs
    require([
		"spec/matches-spec"
    ], function (
    ) {
	    // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
		window.onload();
	});

});
