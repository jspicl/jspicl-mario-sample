import { CELL_SIZE, GRAVITY, TERMINAL_VELOCITY } from "./constants";
import { roundToNearestCell } from "./utils";

function isSolid (x, y) {
  return fget(mget(roundToNearestCell(x), roundToNearestCell(y)), 0);
}

export function checkForCollisions (actor) {
  const proxy = Object.assign({}, actor);
  const width = proxy.current.widthUnits * CELL_SIZE;
  const height = proxy.current.heightUnits * CELL_SIZE;
  const { x, y } = proxy;

  let deltaX = proxy.xVelocity * proxy.direction;
  let deltaY = Math.max(TERMINAL_VELOCITY, proxy.yVelocity - GRAVITY * proxy.gravityModifier);
  const x1 = x + deltaX;
  const x2 = x1 + width;
  const y1 = y - deltaY - 1;
  const y2 = y1 + height + 1;
  const topBottomMarkerX1 = x1 + width / 4 + 1;
  const topBottomMarkerX2 = x2 - width / 4 - 1;
  const sideMarkerY1 = y1 + height / 4 + 1;
  const sideMarkerY2 = y2 - height / 4 - 1;

  const isCollidingLeft = isSolid(x1, sideMarkerY1) || isSolid(x1, sideMarkerY2);
  if (isCollidingLeft) {
    deltaX = 0;
    const distance = (roundToNearestCell(x1) + 1) * CELL_SIZE - proxy.x;
    proxy.x = x + Math.min(0.5, distance);
  }

  const isCollidingRight = isSolid(x2, sideMarkerY1) || isSolid(x2, sideMarkerY2);
  if (isCollidingRight) {
    deltaX = 0;
    const distance = x - (roundToNearestCell(x2) - 1) * CELL_SIZE;
    proxy.x = x - Math.min(0.5, distance);
  }

  const isCollidingTop = isSolid(topBottomMarkerX1, y1) || isSolid(topBottomMarkerX2, y1);
  if (isCollidingTop) {
    deltaY = -0.5;
    proxy.jumpDuration = 1000;
    const distance = (roundToNearestCell(y1) + 1) * CELL_SIZE - y;
    proxy.y = y + Math.min(0.5, distance);
  }

  const isCollidingBottom = isSolid(topBottomMarkerX1, y2) || isSolid(topBottomMarkerX2, y2);
  if (isCollidingBottom) {
    deltaY = 0;
    const distance = y - roundToNearestCell(y1 + 2) * CELL_SIZE;
    proxy.y = y - Math.min(0.5, distance);
    proxy.jumpDuration = 0;
    proxy.hasJumped = actor.input.jumpPressed;
    proxy.airDuration = 0;
  }
  else {
    proxy.airDuration = proxy.airDuration + 1;
  }

  proxy.x += deltaX;
  proxy.y -= deltaY;
  proxy.yVelocity = deltaY;
  proxy.xVelocity = deltaX;

  Object.assign(actor, proxy);
}
