import { updatePositionBasedOnMotion, resetMomentum } from "../utils";
import { updateAnimation } from "../animation";

export function playerDead (actor, actors, elapsedTime) {
  if (actor.status !== "dead") {
    resetMomentum(actor);
    actor.status = "dead";
    actor.deathTimer = 0;
    actor.currentAnimation = actor.sprites.dead;
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
