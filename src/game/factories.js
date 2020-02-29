import { TERMINAL_VELOCITY, CELL_SIZE, DIRECTION_RIGHT } from "./constants";

let counter = 0;
function generateUniqueId () {
  counter = (counter + 1) % 100;
  return counter;
}

export function createActor (args) {
  return Object.assign({
    id: generateUniqueId(),
    x: 0,
    y: 0,
    health: 1,
    type: "enemy",
    direction: DIRECTION_RIGHT,
    facingDirection: DIRECTION_RIGHT,
    targetXVelocity: 0,
    targetYVelocity: TERMINAL_VELOCITY,
    xVelocity: 0,
    yVelocity: 0,
    jumpDuration: 0,
    acceleration: 2,
    maxMoveVelocity: 14,
    maxSprintVelocity: 72,
    currentAnimationFrame: 0,
    currentAnimation: args.sprites.default,
    allowUpdating: false,
    allowRendering: false,
    collidable: true
  }, args);
}

export function createKeyframeAnimation (index, frames = 1, duration = 1000, widthCells = 1, heightCells = 1) {
  return {
    index,
    frames,
    duration,
    widthCells,
    heightCells,
    width: widthCells * CELL_SIZE,
    height: heightCells * CELL_SIZE
  };
}
