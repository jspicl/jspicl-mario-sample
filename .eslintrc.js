module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "globals": {
    // PICO 8 stuff
    "btn": true,
    "camera": true,
    "cls": true,
    "fget": true,
    "map": true,
    "mget": true,
    "palt": true,
    "print": true,
    "rectfill": true,
    "spr": true
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};