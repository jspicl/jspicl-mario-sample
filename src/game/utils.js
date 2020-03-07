import { CELL_SIZE, TERMINAL_VELOCITY, GRAVITY } from "./constants";

export function roundToNearestCell (value) {
  return Math.floor(value / CELL_SIZE);
}

export function lerp (v0, v1, elapsedTime) {
  return (1 - elapsedTime) * v0 + elapsedTime * v1;
}

export function clamp (value, min, max) {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
}

export function deadZone (value, threshold) {
  return Math.abs(value) <= threshold ? 0 : value;
}

export function resetMomentum (actor) {
  actor.jumpDuration = 0;
  actor.yVelocity = 0;
  actor.targetXVelocity = 0;
  actor.xVelocity = 0;
}

export function updatePositionBasedOnMotion (actor, elapsedTime) {
  let { acceleration } = actor;
  if (actor.targetXVelocity < 0) {
    if (actor.xVelocity > 0) {
      acceleration *= 2.2;
    }
    actor.xVelocity = Math.max(actor.xVelocity - acceleration, actor.targetXVelocity);
  }
  else if (actor.targetXVelocity > 0) {
    if (actor.xVelocity < 0) {
      acceleration *= 2.2;
    }
    actor.xVelocity = Math.min(actor.xVelocity + acceleration, actor.targetXVelocity);
  }
  else {
    actor.xVelocity = deadZone(actor.xVelocity * (actor.airBorne ? 0.95 : 0.7), 1); // Use friction?
  }

  actor.yVelocity = Math.min(TERMINAL_VELOCITY, actor.yVelocity + GRAVITY
  );

  actor.previousY = actor.y;
  actor.previousX = actor.x;
  actor.x += actor.xVelocity * elapsedTime;
  actor.y += actor.yVelocity * elapsedTime;
}
