({
  appDir: "client",
  baseUrl: "./",
  dir: "client-build",

  // call with `node r.js -o build.js`
  // add `optimize=none` to skip script optimization (useful during debugging).

  mainConfigFile: "./client/main.js",

  modules: [
    {
    	name: "main"
    }
  ]
})
