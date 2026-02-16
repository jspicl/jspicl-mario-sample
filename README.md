# PICO-8 Mario

A Super Mario Bros. inspired platformer game for PICO-8, written entirely in JavaScript using [jspicl](https://jspicl.github.io). This project demonstrates how to build complex PICO-8 games with modern JavaScript, including hot-reloading, modular code structure, and advanced game mechanics.

![Mario gameplay demo](https://raw.githubusercontent.com/AgronKabashi/assets/master/jspicl/mario-sample.gif)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)
- [PICO-8](https://www.lexaloffle.com/pico-8.php) (full version required)

## Installation

1. Clone the repository:

```shell
git clone https://github.com/jspicl/jspicl-mario-sample.git
cd jspicl-mario-sample
```

2. Install dependencies:

```shell
yarn install
```

## Usage

### Start Development Server

Launch the game with hot-reloading enabled:

```shell
yarn start
```

This command will:

- Compile JavaScript code to Lua
- Generate a PICO-8 cartridge (`build/game.p8`)
- Automatically launch PICO-8 with the cartridge
- Watch for file changes and reload automatically

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading.mp4"></video>

### Build for Production

Build the game without watching for changes:

```shell
yarn build
```

### Restore Original Cartridge

Restore the `game.p8` cartridge from the project root to the build directory:

```shell
yarn restore-cart
```

**⚠️ CAUTION**: This will overwrite any existing cartridge in the `build` directory. Make sure to backup your work first!

## Game Controls

| Action     | Key         |
| ---------- | ----------- |
| Move Left  | ← Arrow Key |
| Move Right | → Arrow Key |
| Jump       | Z or C      |
| Run/Fire   | X or V      |

## Project Structure

```
jspicl-mario-sample/
├── src/                    # Source code
│   ├── index.js           # Main entry point
│   └── game/              # Game logic
│       ├── actorFactories.js   # Enemy and player creation
│       ├── animation.js        # Animation system
│       ├── constants.js        # Game constants
│       ├── debug.js           # Debug utilities
│       ├── input.js           # Input handling
│       ├── physics.js         # Physics engine
│       ├── utils.js           # Utility functions
│       ├── collisions/        # Collision detection
│       ├── render/            # Rendering logic
│       ├── sprites/           # Sprite definitions
│       └── states/            # Game state management
├── build/                 # Build output
│   └── game.p8           # Compiled PICO-8 cartridge
├── docs/                  # Documentation
├── game.p8               # Original cartridge
├── jspicl.config.js      # jspicl configuration
└── package.json          # Project dependencies
```

## Development Workflow

### Hot-Reloading Code Changes

The development server watches for changes in JavaScript files. When you save a file, the cartridge automatically rebuilds and reloads in PICO-8.

### Updating Spritesheet

You can edit the spritesheet directly in PICO-8 or with an external editor. When you save the spritesheet file, jspicl-CLI will reload the cartridge with your new sprites.

<video width="640" controls loop src="https://github.com/AgronKabashi/assets/raw/refs/heads/master/jspicl/hotreloading2.mp4"></video>

### Adding New Enemies

1. Create a new sprite file in `src/game/sprites/`
2. Define the enemy behavior and animation
3. Add the sprite to `src/game/sprites/index.js`
4. Create a factory function in `src/game/actorFactories.js`
5. Add collision handlers in `src/game/collisions/` if needed

## Tech Stack

- **[jspicl](https://jspicl.github.io)** - JavaScript to Lua transpiler for PICO-8
- **[PICO-8](https://www.lexaloffle.com/pico-8.php)** - Fantasy console game engine
- **JavaScript (ES6+)** - Modern JavaScript with modules
- **Yarn** - Package manager

## Troubleshooting

### PICO-8 doesn't launch automatically

Make sure PICO-8 is installed and accessible from your command line. You may need to add PICO-8 to your system PATH or configure jspicl to point to the PICO-8 executable.

### Changes aren't reflected in the game

1. Ensure `yarn start` is running
2. Check the terminal for build errors
3. Verify that PICO-8 didn't crash or freeze
4. Try restarting the development server

### Build errors

- Ensure all dependencies are installed: `yarn install`
- Check that your JavaScript syntax is compatible with jspicl
- Review the jspicl documentation for supported features

## Related Projects

- [jspicl Documentation](https://jspicl.github.io)
- [jspicl GitHub Repository](https://github.com/jspicl/jspicl)
- [More jspicl Games](https://github.com/topics/jspicl-game)

## License

This project is licensed under the MIT License - see the [LICENCE.md](LICENCE.md) file for details.
