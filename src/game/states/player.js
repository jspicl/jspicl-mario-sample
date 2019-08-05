import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../constants";
import { getInput } from "../input";
import { updateAnimation } from "../animation";
import { checkForCollisionsAgainstEnvironment, updatePositionBasedOnMotion } from "../physics";
import { roundToNearestCell } from "../utils";

export function player (actor, elapsedTime) {
  // 1. Collect input
  actor.input = getInput();

  // 2. Update motion based on input
  updatePlayerMotion(actor);

  // 3. Update position based on motion
  updatePositionBasedOnMotion(actor);

  // 4. Collision detect & correct
  const collisionInfo = checkForCollisionsAgainstEnvironment(actor);

  // 5. Respond to collision events
  if (collisionInfo.ground) {
    actor.jumpDuration = 0;
    actor.yVelocity = 0;
    actor.hasJumped = actor.input.jumpPressed;
    actor.airDuration = 0;
  }
  else {
    actor.airDuration = actor.airDuration + 1;
  }

  if (collisionInfo.top) {
    actor.jumpDuration = 1000;
    actor.yVelocity = -0.1;

    // if (collisionInfo.top.type === 33) {
    //   mset(collisionInfo.top.mapX, collisionInfo.top.mapY, 0);
    // }
  }

  // 6. Update animation
  updatePlayerAnimation(actor, elapsedTime);
}

function updatePlayerMotion (actor) {
  if (!actor.hasJumped && actor.input.jumpPressed && actor.jumpDuration < 13) {
    actor.yVelocity = actor.jumpVelocity;
    actor.jumpDuration = actor.jumpDuration + 1;
  }

  // Disable jumping if the player has been airborne for a certain amount of time
  if (!actor.input.jumpPressed && actor.airDuration > 0 && actor.airDuration > 6) {
    actor.hasJumped = true;
  }

  if (actor.input.leftPressed || actor.input.rightPressed) {
    actor.xVelocity = actor.moveVelocity;
    if (actor.input.shootPressed) {
      actor.xVelocity *= 1.5;
    }
  }
  else {
    actor.xVelocity = 0;
  }

  actor.direction = actor.input.leftPressed && DIRECTION_LEFT || actor.input.rightPressed && DIRECTION_RIGHT || actor.direction;
}

function updatePlayerAnimation (actor, elapsedTime) {
  let animation = actor.sprites.default;
  if (actor.yVelocity !== 0) {
    animation = actor.sprites.jump;
  }
  else if (actor.xVelocity !== 0) {
    animation = actor.sprites.run;
  }
  else if (actor.xVelocity === 0) {
    animation = actor.sprites.default;
  }

  if (actor.currentAnimation !== animation) {
    actor.cursor = 0;
  }

  actor.currentAnimation = animation;

  updateAnimation(actor, elapsedTime);
}

