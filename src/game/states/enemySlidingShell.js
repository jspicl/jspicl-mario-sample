import { updateAnimation } from "../animation";
import { updatePositionBasedOnMotion } from "../utils";
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../constants";
import { checkForCollisionsAgainstEnvironment } from "../physics";

export function enemySlidingShell (actor, actors, elapsedTime) {
  if (!actor.allowUpdating) {
    return;
  }

  actor.status = "slidingshell";
  actor.direction = actor.direction || DIRECTION_LEFT;
  actor.targetXVelocity = 72 * actor.direction;
  actor.xVelocity = actor.targetXVelocity;

  updatePositionBasedOnMotion(actor, elapsedTime);

  // 4. Collision detect & correct
  const collisionInfo = checkForCollisionsAgainstEnvironment(actor, elapsedTime);

  // 5. Respond to collision events
  if (collisionInfo.ground) {
    actor.yVelocity = 0;
  }

  if (collisionInfo.left || collisionInfo.right) {
    actor.xVelocity = 0;
    actor.targetXVelocity = 0;
    actor.direction = collisionInfo.right ? DIRECTION_LEFT : DIRECTION_RIGHT;
    actor.cursor = 0;
  }

  actor.facingDirection = actor.direction;

  actor.currentAnimation = actor.sprites.slidingShell;
  updateAnimation(actor, elapsedTime);
}
