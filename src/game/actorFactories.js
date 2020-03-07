import { generateUniqueId } from "./utils";
import { DIRECTION_RIGHT, DIRECTION_LEFT } from "./constants";
import * as STATES from "./states";
import * as SPRITES from "./sprites";

export function createActor (args) {
  return Object.assign({
    id: generateUniqueId(),
    status: "active",
    x: 0,
    y: 0,
    health: 1,
    direction: DIRECTION_LEFT,
    facingDirection: args.direction || DIRECTION_LEFT,
    targetXVelocity: 0,
    xVelocity: 0,
    yVelocity: 0,
    jumpDuration: 0,
    acceleration: 2,
    maxMoveVelocity: 14,
    currentAnimationFrame: 0,
    currentAnimation: args.sprites.default,

    allowUpdating: true,
    allowRendering: true,
    allowCollisions: true
  }, args);
}

export function createEnemy (args) {
  return createActor(Object.assign({
    type: "enemy",
    updateState: STATES.enemy,
    x: 0,
    y: 0,
    allowUpdating: false
  }, args));
}
export function createGoomba (x, y) {
  return createEnemy({
    x,
    y,
    sprites: SPRITES.goomba
  });
}

export function createKoopa (x, y) {
  return createEnemy({
    x,
    y,
    health: 2,
    sprites: SPRITES.koopa
  });
}

export function createSpiny (x, y) {
  return createEnemy({
    x,
    y,
    hasSpikes: true,
    sprites: SPRITES.spiny
  });
}

export function createRandomEnemy (x, y) {
  const enemies = [createGoomba, createKoopa, createSpiny];
  const index = Math.floor(Math.random() * 100 % enemies.length);
  return enemies[index + 1](x, y);
}

export function createPlayer (x, y) {
  return createActor({
    type: "player",
    allowRendering: true,
    updateState: STATES.player,
    x,
    y,
    maxMoveVelocity: 48,
    maxSprintVelocity: 72,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.mario
  });
}

export function createPlayerCamera () {
  return createActor({
    type: "camera",
    updateState: STATES.camera,
    allowRendering: false,
    y: -48,
    sprites: {
      default: {
        width: 128,
        height: 128
      }
    }
  });
}
