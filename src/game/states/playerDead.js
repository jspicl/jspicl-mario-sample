import { updatePositionBasedOnMotion } from "../utils";
import { updateAnimation } from "../animation";

export function playerDead (actor, actors, elapsedTime) {
  if (!actor.deathTimer) {
    actor.dead = true;
    actor.jumpDuration = 0;
    actor.deathTimer = 0;
    actor.yVelocity = 0;
    actor.currentAnimation = actor.sprites.dead;
    actor.targetXVelocity = 0;
    actor.xVelocity = 0;
  }

  if (actor.deathTimer > 0.4) {
    updatePositionBasedOnMotion(actor, elapsedTime);

    if (actor.deathTimer < 0.5) {
      actor.yVelocity = -100;
    }
  }

  actor.deathTimer += elapsedTime;

  if (actor.deathTimer > 2) {
    actor.reset = true;
  }

  updateAnimation(actor, elapsedTime);
}
