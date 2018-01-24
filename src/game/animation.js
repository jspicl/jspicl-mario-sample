export function updateAnimation (actor, elapsedTime) {
  actor.current = actor.current || actor.sprites.default;

  actor.cursor = (actor.cursor + elapsedTime / actor.current.duration) % actor.current.frames;
}
