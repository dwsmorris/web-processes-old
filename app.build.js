({
  appDir: "client",
  baseUrl: "./",
  dir: "client-build",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./client/main.js",

  map: {
  	"*": {
  		"css": "dependencies/require-css/css-builder"
  	}
  },

  stubModules: ['rvc'],

  skipDirOptimize: true,

  modules: [
    {
      name: "main",
      exclude: ["text"]
    }
  ]
})
