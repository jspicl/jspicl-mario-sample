# jspicl Sample project
This is a sample project demonstrating how you can use [jspicl](https://github.com/AgronKabashi/jspicl) to write your PICO-8 games in Javascript.

![](https://i.imgur.com/b3rAt6t.gif)

## Usage
```Shell
npm start
```

This will create a cartridge and automatically launch it in PICO-8. Whenever source files are changed, a rebuild will take place and reload PICO-8 with the new cartridge for you.

![](https://i.imgur.com/QYj4Xga.gif)

If a cartridge already exists in the build folder then all the assets, sans lua code, will be reused and included in the newly build cartridge.

For more advanced build options, please look at [rollup-plugin-jspicl](https://github.com/AgronKabashi/rollup-plugin-jspicl)'s options and modify rollup.config.js accordingly.


```
npm run restore-cart
```

This will take the game.p8 cartridge in the project root and put it in the build directory for you.
**CAUTION**: This will overwrite any existing cartridge in the destination folder so make sure you do a backup first.

## Other `jspicl` games
* On github: [https://github.com/topics/jspicl-sample](https://github.com/topics/jspicl-sample)
