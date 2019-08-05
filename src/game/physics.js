import { CELL_SIZE, GRAVITY, TERMINAL_VELOCITY } from "./constants";
import { roundToNearestCell } from "./utils";

function isSolid (x, y) {
  return fget(mget(x, y), 0);
}

function isPlatform (x, y) {
  return fget(mget(x, y), 1);
}

export function updatePositionBasedOnMotion (actor) {
  actor.previousY = actor.y;
  actor.previousX = actor.x;
  actor.x += actor.xVelocity * actor.direction;
  actor.yVelocity = Math.max(-TERMINAL_VELOCITY, actor.yVelocity - GRAVITY * actor.gravityModifier);
  actor.y -= actor.yVelocity;
}

export function checkForCollisionsAgainstActors (actors, actor) {
  // actors.forEach(target => {
  //   if (actor === target) {
  //     return;
  //   }

  //   const actorWidth = actor.x + actor.currentAnimation.widthUnits * CELL_SIZE;
  //   const actorHeight = actor.y + actor.currentAnimation.heightUnits * CELL_SIZE;
  //   const targetWidth = target.x + target.currentAnimation.widthUnits * CELL_SIZE;
  //   const targetHeight = target.y + target.currentAnimation.heightUnits * CELL_SIZE;

  //   if (actor.x < target.x && actorWidth > target.x) {
  //     target.direction = target.direction * -1;
  //   }
  // });
}

export function checkForCollisionsAgainstEnvironment (actor) {
  const width = actor.currentAnimation.widthUnits * CELL_SIZE;
  const height = actor.currentAnimation.heightUnits * CELL_SIZE;
  const { x: actorX, y: actorY } = actor;

  let x = roundToNearestCell(actorX);
  let y = roundToNearestCell(actorY);
  const x2 = roundToNearestCell(actorX + width - 1);
  const y2 = roundToNearestCell(actorY + height);
  const topBottomMarkerX = roundToNearestCell(actorX + width / 4);
  const topBottomMarkerX2 = roundToNearestCell(actorX - 1 + width / 4 * 3);
  const sideMarkerY1 = roundToNearestCell(actorY + height / 4 + 1);
  const sideMarkerY2 = roundToNearestCell(actorY + height / 4 * 3 - 1);
  const collisionInfo = {};

  const isCollidingLeft = isSolid(x, sideMarkerY1) || isSolid(x, sideMarkerY2);
  if (isCollidingLeft) {
    collisionInfo.left = true;
    actor.x = x * CELL_SIZE + CELL_SIZE;
    x++;
  }

  const isCollidingRight = isSolid(x2, sideMarkerY1) || isSolid(x2, sideMarkerY2);
  if (isCollidingRight) {
    collisionInfo.right = true;
    actor.x = x * CELL_SIZE;
  }

  const isCollidingTopLeft = isSolid(topBottomMarkerX, y);
  const isCollidingTopRight = isSolid(topBottomMarkerX2, y);
  if (isCollidingTopLeft || isCollidingTopRight) {
    const mapX = isCollidingTopLeft ? topBottomMarkerX : topBottomMarkerX2;
    const mapY = y;

    collisionInfo.top = {
      type: mget(mapX, mapY),
      mapX,
      mapY
    };
    actor.y = y * CELL_SIZE + CELL_SIZE;
    y++;
  }

  const isCollidingBottom = isSolid(topBottomMarkerX, y2) || isSolid(topBottomMarkerX2, y2);
  const isCollidingWithPlatform = isPlatform(topBottomMarkerX, y2) || isPlatform(topBottomMarkerX2, y2);
  const isPreviousLocationAbovePlatformAndNotSolid = !isSolid(x, roundToNearestCell(actor.previousY + height - 1));
  const isFalling = actor.yVelocity <= -GRAVITY;

  if (isCollidingBottom
    || isCollidingWithPlatform && isPreviousLocationAbovePlatformAndNotSolid && isFalling) {
    collisionInfo.ground = true;
    collisionInfo.platform = isCollidingWithPlatform;
    actor.y = y2 * CELL_SIZE - height;
  }

  return collisionInfo;
}
