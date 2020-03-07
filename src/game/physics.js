import { CELL_SIZE } from "./constants";
import { roundToNearestCell, lerp } from "./utils";

function getCellState (x, y, flag) {
  return fget(mget(x, y), flag);
}
function isSolid (x, y) {
  return getCellState(x, y, 0);
}

function isPlatform (x, y) {
  return getCellState(x, y, 1);
}

function isLethal (x, y) {
  return getCellState(x, y, 7);
}

export function checkForCollisionsAgainstActors (actors, collisionActions) {
  const alreadyExecutedCollisions = {};

  // Very naive and non performant collision detection
  actors.forEach(actor => {
    actors.forEach(target => {
      const id = Math.min(actor.id, target.id) * 1000 + Math.max(actor.id, target.id);
      if (!actor.allowCollisions || !target.allowCollisions || actor === target || alreadyExecutedCollisions[id]) {
        return;
      }

      alreadyExecutedCollisions[id] = true;

      if (
        actor.x + 1 < target.x + target.currentAnimation.width - 1
        && actor.x + actor.currentAnimation.width - 1 > target.x + 1
        && actor.y + 1 < target.y + target.currentAnimation.height - 1
        && actor.y + actor.currentAnimation.height - 1 > target.y + 1) {
        const type = [actor.type, target.type].sort().join("vs");
        const colliderAction = collisionActions[type];
        if (colliderAction) {
          colliderAction(actor, target);
        }
      }
    });
  });
}

export function checkForCollisionsAgainstEnvironment (actor) {
  const collisionInfo = {};
  const { width, height } = actor.currentAnimation;
  const { x, y } = actor;

  let left = roundToNearestCell(x);
  let right = roundToNearestCell(x + width);
  let top = roundToNearestCell(y - height);
  let bottom = roundToNearestCell(y);
  const verticalCollisionMarkerLeft = roundToNearestCell(x + width / 4);
  const verticalCollisionMarkerRight = roundToNearestCell(x + width / 4 * 3);
  const sideCollisionMarkerTop = roundToNearestCell(y - height / 4);
  const sideCollisionMarkerBottom = roundToNearestCell(y - height / 4 * 3);

  if (isLethal(left, top) || isLethal(left, bottom) || isLethal(right, top) || isLethal(right, bottom)) {
    collisionInfo.lethal = true;
    return collisionInfo;
  }

  const isCollidingLeft = isSolid(left, sideCollisionMarkerBottom) || isSolid(left, sideCollisionMarkerTop);
  if (isCollidingLeft) {
    collisionInfo.left = true;
    actor.x = lerp(actor.x, left * CELL_SIZE + CELL_SIZE, 0.25);
    left++;
    right++;
  }

  const isCollidingRight = isSolid(right, sideCollisionMarkerBottom) || isSolid(right, sideCollisionMarkerTop);
  if (isCollidingRight) {
    collisionInfo.right = true;
    actor.x = lerp(actor.x, left * CELL_SIZE, 0.25);
    right--;
  }

  const isCollidingTop = isSolid(verticalCollisionMarkerLeft, top) || isSolid(verticalCollisionMarkerRight, top);
  if (isCollidingTop) {
    collisionInfo.top = true;
    actor.y = (top + 1) * CELL_SIZE + CELL_SIZE;
    top++;
  }

  const isCollidingWithPlatform = isPlatform(verticalCollisionMarkerLeft, bottom) || isPlatform(verticalCollisionMarkerRight, bottom);
  const adjustPlatformPosition = !isSolid(verticalCollisionMarkerLeft, roundToNearestCell(actor.previousY - height || 0)) || !isSolid(verticalCollisionMarkerRight, roundToNearestCell(actor.previousY - height || 0));
  const isFalling = actor.yVelocity >= 0;

  if (isCollidingWithPlatform && isFalling && adjustPlatformPosition) {
    collisionInfo.ground = true;
    collisionInfo.platform = true;
    actor.y = lerp(actor.y, bottom * CELL_SIZE, 0.25);
    bottom--;
    top--;
  }

  const isCollidingBottom = isSolid(verticalCollisionMarkerLeft, bottom) || isSolid(verticalCollisionMarkerRight, bottom);
  if (isCollidingBottom) {
    collisionInfo.ground = true;
    actor.y = bottom * CELL_SIZE;
    bottom--;
    top--;
  }

  return collisionInfo;
}
