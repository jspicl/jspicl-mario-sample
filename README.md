# jspicl Sample project
This is a sample project demonstrating how you can use [jspicl](https://github.com/AgronKabashi/jspicl) to build your PICO-8 games in Javascript.

## Installation
```
npm install
```

### Usage
Copy the `mario.p8` sample cartridge to your PICO-8 carts folder.

To generate the LUA code run:

```
npm start
```

This will keep watching the source files for changes and recompile in the background.

Copy the generated code from `build/bundle.lua` and paste it in the PICO-8 code editor.

## Versioning
This project uses semantic versioning

## Licence
MIT