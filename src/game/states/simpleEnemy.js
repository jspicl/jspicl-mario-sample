import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../constants";
import { checkForCollisionsAgainstEnvironment } from "../physics";
import { updatePositionBasedOnMotion } from "../utils";
import { updateAnimation } from "../animation";

export function simpleEnemy (actor, actors, elapsedTime) {
  if (!actor.allowUpdating) {
    return;
  }
  // 1. Collect input

  // 2. Update motion based on input
  actor.direction = actor.direction || DIRECTION_LEFT;
  actor.targetXVelocity = actor.maxMoveVelocity * actor.direction;

  // 3. Update position based on motion
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

  // 6. Update animation
  let animation = actor.sprites.default;
  if (actor.xVelocity !== 0) {
    animation = actor.sprites.run;
  }

  if (actor.currentAnimation !== animation) {
    actor.cursor = 0;
  }

  actor.currentAnimation = animation;
  updateAnimation(actor, elapsedTime);
}

