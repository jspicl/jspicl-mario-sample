export function camera (actor, actors) {
  actor.x = Math.max(actors.player.x - 60, actor.x);
}
