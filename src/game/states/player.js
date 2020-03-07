import { DIRECTION_LEFT, DIRECTION_RIGHT, MAX_AIRJUMP_DURATION, MAX_JUMP_DURATION } from "../constants";
import { getInput } from "../input";
import { updateAnimation } from "../animation";
import { checkForCollisionsAgainstEnvironment } from "../physics";
import { updatePositionBasedOnMotion } from "../utils";
import { playerDead } from "./playerDead";

export function player (actor, actors, elapsedTime) {
  actor.status = "active";
  // 1. Collect input
  actor.input = getInput();

  // 2. Update motion based on input
  updatePlayerMotion(actor, elapsedTime);

  // 3. Update position based on motion
  updatePositionBasedOnMotion(actor, elapsedTime);

  // 4. Collision detect & correct
  const collisionInfo = checkForCollisionsAgainstEnvironment(actor, elapsedTime);

  if (actor.x < actors.camera.x) {
    actor.x = actors.camera.x;
    collisionInfo.left = true;
  }
  else if (actor.x > actors.camera.x + 128) {
    actor.x = actors.camera.x;
    collisionInfo.right = true;
  }

  // 5. Respond to collision events
  if (collisionInfo.lethal) {
    actor.updateState = playerDead;
    return;
  }

  if (collisionInfo.left || collisionInfo.right) {
    actor.xVelocity = 0;
    actor.targetXVelocity = 0;
  }

  if (collisionInfo.ground) {
    actor.jumpDuration = 0;
    actor.yVelocity = 0;
    actor.hasJumped = actor.input.jumpPressed;
    actor.airBorne = false;
  }
  else {
    actor.jumpDuration = actor.jumpDuration + elapsedTime;
    actor.airBorne = true;
  }

  if (collisionInfo.top) {
    actor.jumpDuration = 1000;
    actor.yVelocity = -1;

    // if (collisionInfo.top.type === 33) {
    //   mset(collisionInfo.top.mapX, collisionInfo.top.mapY, 0);
    // }
  }

  // 6. Update animation
  updatePlayerAnimation(actor, elapsedTime);
}

function updatePlayerMotion (actor, elapsedTime) {
  if (!actor.hasJumped && actor.input.jumpPressed && actor.jumpDuration < MAX_JUMP_DURATION) {
    actor.yVelocity = -100;
    actor.jumpDuration += elapsedTime;
  }

  // Disable jumping if the player has been airborne for a certain amount of time
  if (!actor.input.jumpPressed && actor.jumpDuration > MAX_AIRJUMP_DURATION) {
    actor.hasJumped = true;
  }

  if (actor.input.leftPressed || actor.input.rightPressed) {
    actor.direction = actor.input.leftPressed && DIRECTION_LEFT || actor.input.rightPressed && DIRECTION_RIGHT;
    actor.facingDirection = actor.airBorne && actor.facingDirection || actor.direction;
    actor.targetXVelocity = actor.direction * actor.maxMoveVelocity;
    if (actor.input.shootPressed) {
      actor.targetXVelocity = actor.direction * actor.maxSprintVelocity;
    }
  }
  else {
    actor.targetXVelocity = 0;
  }
}

function updatePlayerAnimation (actor, elapsedTime) {
  let animation = actor.sprites.default;
  if (actor.airBorne) {
    animation = actor.sprites.jump;
  }
  else if (actor.xVelocity !== 0) {
    animation = actor.sprites.run;
  }
  else {
    animation = actor.sprites.default;
  }

  if (actor.currentAnimation !== animation) {
    actor.currentAnimationFrame = 0;
  }

  actor.currentAnimation = animation;

  updateAnimation(actor, elapsedTime);
}

