({
  appDir: "client",
  baseUrl: "./",
  dir: "client-build",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  "paths": {
  	"worker": "dependencies/worker/worker-build",
  	"worker1": "js/worker1.js",
  	"underscore": "dependencies/lodash/lodash"
  },
  "shim": {
  	"underscore": {
  		"exports": "_"
  	},
  	"worker": {
  		"deps": ["underscore"]
  	}
  },
  modules: [
    {
      name: "main"
    }
  ]
})
