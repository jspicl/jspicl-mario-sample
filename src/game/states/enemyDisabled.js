import { updateAnimation } from "../animation";
import { simpleEnemy } from "./simpleEnemy";

export function enemyDisabled (actor, actors, elapsedTime) {
  if (!actor.disabledTimer) {
    actor.disabledTimer = 0;
    actor.jumpDuration = 0;
    actor.yVelocity = 0;
    actor.currentAnimation = actor.sprites.disabled;
    actor.targetXVelocity = 0;
    actor.xVelocity = 0;
  }

  actor.disabledTimer += elapsedTime;

  if (actor.disabledTimer > 2) {
    actor.health = 2;
    actor.disabledTimer = 0;
    actor.updateState = simpleEnemy;
  }

  updateAnimation(actor, elapsedTime);
}
