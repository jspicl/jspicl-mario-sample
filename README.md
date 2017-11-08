# jspicl Sample project
This is a sample project demonstrating how you can use [jspicl](https://github.com/AgronKabashi/jspicl) to build your PICO-8 games in Javascript.

![](http://i.imgur.com/Bn8cq1A.gif)

## Installation
```
git clone https://github.com/AgronKabashi/jspicl-mario-sample.git
cd jspicl-mario-sample
npm install
```

### First time setup
You need to setup an output destination for the cartridge. This is done by modifying the `destFolder` property in `package.json` to point to your PICO-8 folder. If you're on Windows then don't forget to
escape the backslashes in your path (`\\`).

### Usage

Run `npm start` to start building the game. This will generate the cartridge and keep watching the source files for any changes. If a cartridge already exists then it will be parsed and everything, sans lua code, will be reused and included in the newly build cartridge.

In PICO-8 you run the `load` command followed by `run` to execute your cartridge. You need to run `load` everytime you modify your source code to ensure that PICO-8 has the newest code in memory.
```
load mario-sample
run
```

### Other
In order to "factory-reset" your cartridge to the initial version you can run:
```
npm run restore-cart
```

CAUTION: This will overwrite any existing cartridge in the destination folder so make sure you do a backup first.

## Licence
MIT
