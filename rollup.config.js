import buble from "rollup-plugin-buble";
import includePaths from "rollup-plugin-includepaths";
import jspicl from "rollup-plugin-jspicl";

const { config: { input, destFolder, destName }} = require("./package.json");
const bundlePath = `${destFolder}/${destName}`;

export default {
  input,
  output: {
    file: bundlePath,
    format: "es"
  },
  plugins: [
    includePaths({
      paths: ["src"]
    }),
    buble(),
    {
      transformBundle: function (source) {
        return source.replace(/\/\/ <!-- DEBUG[^\/\/]*\/\/\s-->/g, "");
      }
    },
    jspicl({
      cartridgePath: bundlePath,
      jsOutput: "build/mario.js",
      luaOutput: "build/mario.lua"
    })
  ]
};
