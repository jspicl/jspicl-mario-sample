import { updateAnimation } from "../animation";

export function enemyDead (actor, actors, elapsedTime) {
  if (!actor.deathTimer) {
    actor.collidable = false;
    actor.jumpDuration = 0;
    actor.deathTimer = 0;
    actor.yVelocity = 0;
    actor.currentAnimation = actor.sprites.dead;
    actor.targetXVelocity = 0;
    actor.xVelocity = 0;
  }

  actor.deathTimer += elapsedTime;
  if (actor.deathTimer > 0.75) {
    // const index = actors.findIndex(actor);
    // actors[index] = null;
    del(actors, actor);
  }

  updateAnimation(actor, elapsedTime);
}
