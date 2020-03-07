import { updateAnimation } from "../animation";
import { resetMomentum } from "../utils";

export function enemySquashed (actor, actors, elapsedTime) {
  if (actor.status !== "dead") {
    resetMomentum(actor);
    actor.status = "dead";
    actor.deathTimer = 0;
    actor.allowCollisions = false;
    actor.currentAnimation = actor.sprites.squashed;
  }

  if (actor.deathTimer > 0.75) {
    del(actors, actor);
  }

  actor.deathTimer += elapsedTime;
  updateAnimation(actor, elapsedTime);
}
