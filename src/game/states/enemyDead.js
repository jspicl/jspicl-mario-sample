import { updateAnimation } from "../animation";
import { updatePositionBasedOnMotion } from "../utils";

export function enemyDead (actor, actors, elapsedTime) {
  if (actor.status !== "dead") {
    actor.status = "dead";
    actor.allowCollisions = false;
    actor.jumpDuration = 0;
    actor.deathTimer = 0;
    actor.yVelocity = -75;
    actor.currentAnimation = actor.sprites.dead;
    actor.flipV = true;
  }

  updatePositionBasedOnMotion(actor, elapsedTime);

  if (actor.deathTimer > 0.75) {
    del(actors, actor);
  }

  actor.deathTimer += elapsedTime;
  updateAnimation(actor, elapsedTime);
}
