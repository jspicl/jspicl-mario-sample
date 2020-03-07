export function camera (actor, actors) {
  actor.x = Math.min(Math.max(actors.player.x - 60, actor.x), 888);
}
