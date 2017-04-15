import buble from "rollup-plugin-buble";
import conditional from "rollup-plugin-conditional";
import filesize from "rollup-plugin-filesize";
import includePaths from "rollup-plugin-includepaths";
import uglify from "rollup-plugin-uglify";
import jspicl from "rollup-plugin-jspicl";

export default {
  entry: "src/bootstrap.js",
  dest: "build/bundle.lua",
  format: "es",
  plugins: [
    includePaths({
      paths: ["src"]
    }),
    buble(),
    conditional(false, [
      uglify()
    ]),
    filesize({
      render: (options, size) => `\x1b[32mApplication bundle size: \x1b[33m${size}`
    }),
    jspicl({
      jsOutput: "build/bundle.js"
    })
  ]
};