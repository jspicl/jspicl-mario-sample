import { DIRECTION_LEFT } from "../constants";
import { updatePositionBasedOnMotion, checkForCollisionsAgainstEnvironment } from "../physics";
import { updateAnimation } from "../animation";

export function simpleEnemy (actor, elapsedTime) {
  // 1. Collect input

  // 2. Update motion based on input
  actor.xVelocity = actor.moveVelocity;
  actor.direction = actor.direction || DIRECTION_LEFT;

  // 3. Update position based on motion
  updatePositionBasedOnMotion(actor);

  // 4. Collision detect & correct
  const collisionInfo = checkForCollisionsAgainstEnvironment(actor);

  // 5. Respond to collision events
  if (collisionInfo.ground) {
    actor.yVelocity = 0;
  }

  if (collisionInfo.left || collisionInfo.right) {
    actor.direction = actor.direction * -1;
    actor.cursor = 0;
  }

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

