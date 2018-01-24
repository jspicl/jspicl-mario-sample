# jspicl Sample project
This is a sample project demonstrating how you can use [jspicl](https://github.com/AgronKabashi/jspicl) to write your PICO-8 games in Javascript.

![](https://i.imgur.com/b3rAt6t.gif)

## Installation
```
git clone https://github.com/AgronKabashi/jspicl-mario-sample.git
cd jspicl-mario-sample
npm install
```

### Usage

Running `npm start` will compile your game into a .p8 cartridge and auto launch the game in PICO-8. Any modifications to the source code will regenerate the cartridge and live-reload the game for you (NOTE: live-reloading currently only works in MacOS. For other systems, press Ctrl+R in PICO-8 to reload manually).

If a cartridge already exists in the build folder then it will be parsed and all of the assets, sans lua code, will be reused and included in the newly build cartridge.

For more advanced build options, please look at [rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl)'s options and modify rollup.config.js accordingly.

### Resetting
To restore your cartridge to the initial, included version you can run:
```
npm run restore-cart
```

This will take the game.p8 cartridge and put it in the build directory for you.

CAUTION: This will overwrite any existing cartridge in the destination folder so make sure you do a backup first.

## Licence
MIT
