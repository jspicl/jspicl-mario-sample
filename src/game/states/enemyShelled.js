import { updateAnimation } from "../animation";
import { enemy } from "./enemy";
import { resetMomentum } from "../utils";

export function enemyShelled (actor, actors, elapsedTime) {
  if (actor.status !== "shelled") {
    resetMomentum(actor);
    actor.status = "shelled";
    actor.disabledTimer = 0;
    actor.currentAnimation = actor.sprites.shelled;
  }

  actor.disabledTimer += elapsedTime;

  if (actor.disabledTimer > 4) {
    actor.disabled = false;
    actor.health = 2;
    actor.updateState = enemy;
  }

  updateAnimation(actor, elapsedTime);
}
