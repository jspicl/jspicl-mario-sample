export function updateAnimation (actor, elapsedTime) {
  actor.currentAnimation = actor.currentAnimation || actor.sprites.default;

  actor.cursor = (actor.cursor + elapsedTime / actor.currentAnimation.duration) % actor.currentAnimation.frames;
}
