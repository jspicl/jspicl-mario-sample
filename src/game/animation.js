export function updateAnimation (actor, elapsedTime) {
  actor.currentAnimation = actor.currentAnimation || actor.sprites.default;

  actor.currentAnimationFrame = (actor.currentAnimationFrame + elapsedTime / actor.currentAnimation.duration) % actor.currentAnimation.frames;
}
