/*globals require, window*/

require.config({
	baseUrl: "./",
	paths: {
		"underscore": "dependencies/lodash/lodash",
		"underscore-contrib": "dependencies/underscore-contrib/dist/underscore-contrib",
		"jasmine": "dependencies/jasmine/lib/jasmine-core/jasmine",
		"jasmine-html": "dependencies/jasmine/lib/jasmine-core/jasmine-html",
		"boot": "dependencies/jasmine/lib/jasmine-core/boot",
		"matches": "dependencies/matchesjs/matches",
		"text": "dependencies/text/text",
		"kefir": "dependencies/kefir",
		"lazy": "dependencies/lazy/lazy",
		"lazyArray": "dependencies/lazy-array/lazy-array",
		"immutable": "dependencies/immutable-js/dist/immutable",
		"highland": "dependencies/highland/dist/highland",
		"ramda": "dependencies/ramda/dist/ramda",
		"lodashFp": "dependencies/lodash-fp/dist/lodash-fp"
	},
	shim: {
		"underscore-contrib": {
			"deps": ["underscore"],
			"exports": "_"
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
		"spec/matches-spec",
		"spec/kefir-spec",
		"spec/underscore-spec",
		"spec/lazy-spec",
		"spec/lazy-array-spec",
		"spec/immutable-spec",
		"spec/highland-spec",
		"spec/transducer-spec",
		"spec/ramda-spec",
		"spec/lodash-fp-spec"
    ], function (
    ) {
	    // Initialize the HTML Reporter and execute the environment (setup by `boot.js`)
		window.onload();
	});

});
