import { CELL_SIZE } from "./constants";

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

export function updateAnimation (actor, elapsedTime) {
  actor.currentAnimation = actor.currentAnimation || actor.sprites.default;

  actor.currentAnimationFrame = (actor.currentAnimationFrame + elapsedTime / actor.currentAnimation.duration) % actor.currentAnimation.frames;
}
