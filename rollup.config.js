import buble from "rollup-plugin-buble";
import includePaths from "rollup-plugin-includepaths";
import jspicl from "rollup-plugin-jspicl";

const { config: { entry, destFolder, destName }} = require("./package.json");

export default {
  entry,
  dest: `${destFolder}/${destName}`,
  format: "es",
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
      jsOutput: "build/mario.js",
      luaOutput: "build/mario.lua"
    })
  ]
};