# PICO-8 Mario
This is a sample project demonstrating how you can use [jspicl-cli](https://github.com/AgronKabashi/jspicl-cli) to build PICO-8 games with Javascript.

![](https://raw.githubusercontent.com/AgronKabashi/assets/master/jspicl/mario-sample.gif)

## Usage
```Shell
npm start
```

This will create a cartridge and automatically launch it in PICO-8. Whenever source files are changed, a rebuild will take place and reload PICO-8 with the updated cartridge for you.

![](https://i.imgur.com/QYj4Xga.gif)

```
npm run restore-cart
```

This will take the game.p8 cartridge in the project root and put it in the build directory for you.
**CAUTION**: This will overwrite any existing cartridge in the destination folder so make sure you do a backup first.

## Updating spritesheet
With jspicl-CLI you don't need to draw your sprites in PICO-8 anymore. Simply edit the spritesheet file, save and the cart will be reloaded with the new changes.

![](https://github.com/AgronKabashi/assets/raw/814f6efe24bc9aca5d9d6ca6259279733529e300/rollup-plugin-jspicl/spritesheetLiveReload.gif)

## Other `jspicl` games
* [https://github.com/topics/jspicl-sample](https://github.com/topics/jspicl-sample)
