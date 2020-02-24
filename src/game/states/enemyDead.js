import { updateAnimation } from "../animation";

export function enemyDead (actor, actors, elapsedTime) {
  if (!actor.deathTimer) {
    actor.dead = true;
    actor.jumpDuration = 0;
    actor.deathTimer = 0;
    actor.yVelocity = 0;
    actor.currentAnimation = actor.sprites.dead;
    actor.targetXVelocity = 0;
    actor.xVelocity = 0;
  }

  actor.deathTimer += elapsedTime;
  updateAnimation(actor, elapsedTime);
}
