import buble from "rollup-plugin-buble";
import includePaths from "rollup-plugin-includepaths";
import jspicl from "rollup-plugin-jspicl";

const bundlePath = "build/game.p8";

export default {
  input: "src/index.js",
  output: {
    file: bundlePath,
    format: "es",
    freeze: false
  },
  plugins: [
    includePaths({
      paths: ["src"]
    }),
    buble(),
    {
      transformBundle: source => source.replace(/\/\/ <!-- DEBUG[^//]*\/\/\s-->/g, "")
    },
    jspicl({
      cartridgePath: bundlePath,
      spritesheetImagePath: "spritesheet.png",
      jsOutput: "build/game.js",
      luaOutput: "build/game.lua"
    })
  ]
};
