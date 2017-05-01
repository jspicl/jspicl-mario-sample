import buble from "rollup-plugin-buble";
import conditional from "rollup-plugin-conditional";
import includePaths from "rollup-plugin-includepaths";
import uglify from "rollup-plugin-uglify";
import jspicl from "rollup-plugin-jspicl";

const packageJson = require("./package.json");

export default {
  entry: packageJson.config.entry,
  dest: packageJson.config.dest,
  format: "es",
  plugins: [
    includePaths({
      paths: ["src"]
    }),
    buble(),
    conditional(false, [
      uglify()
    ]),
    {
      transformBundle: function (source) {
        return source.replace(/\/\/ <!-- DEBUG[^\/\/]*\/\/\s-->/g, "");
      }
    },
    jspicl({
      jsOutput: "build/mario.js",
      luaOutput: "build/mario.lua"
    })
  ]
};