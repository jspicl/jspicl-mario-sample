import { LEFT, RIGHT, TERMINAL_VELOCITY, GRAVITY } from "./constants";

export {
  updatePhysics
};

function roundToNearestCell(value) {
  return Math.floor(value / 8);
}

function isSolid(x, y) {
  return fget(mget(roundToNearestCell(x), roundToNearestCell(y)), 0);
}

function isTraversable (x, y) {
  const leftMarkerX = x;
  const leftMarkerY = y + 4;
  const rightMarkerX = x + 8;
  const rightMarkerY = y + 4;
  const topMarkerX = x + 4;
  const topMarkerY = y;
  const bottomMarkerX = x + 4;
  const bottomMarkerY = y + 8;

  return {
    isCollidingLeft: isSolid(leftMarkerX, leftMarkerY),
    isCollidingRight: isSolid(rightMarkerX, rightMarkerY),
    isCollidingTop: isSolid(topMarkerX, topMarkerY),
    isCollidingBottom: isSolid(bottomMarkerX, bottomMarkerY)
  };
}

function updatePhysics (actor, elapsedTime) {
  const proxy = Object.assign({}, actor);
  const direction = proxy.input.moveLeft && LEFT || proxy.input.moveRight && RIGHT || 0;

  if (direction !== 0) {
    proxy.direction = direction;
  }

  if (proxy.input.jump && proxy.jumpTime < 0.2) {
    proxy.yVelocity = proxy.jumpVelocity;
    proxy.jumpTime += elapsedTime;
  }

  let deltaX = direction * proxy.moveVelocity;
  let deltaY = Math.max(TERMINAL_VELOCITY, proxy.yVelocity - GRAVITY);

  const collInfo = isTraversable(proxy.x + deltaX, proxy.y - deltaY);
  if (collInfo.isCollidingLeft) {
    proxy.x = (Math.floor((proxy.x + deltaX) / 8) + 1) * 8;
//    proxy.xVelocity = 0;
    deltaX = 0;
  }

  if (collInfo.isCollidingRight) {
    proxy.x = roundToNearestCell(proxy.x + deltaX) * 8;
    deltaX = 0;
  }

  if (collInfo.isCollidingTop && collInfo.isCollidingBottom === false) {
    proxy.y = (roundToNearestCell(proxy.y - deltaY) + 1) * 8;
    proxy.yVelocity = 0;
    proxy.jumpTime = 0.2;
    proxy.input.jump = false;
    deltaY = 0;
  }

  if (collInfo.isCollidingBottom) {
    proxy.y = roundToNearestCell(proxy.y - deltaY) * 8;
    proxy.jumpTime = 0;
    proxy.input.jump = false;
    deltaY = 0;
  }

  proxy.x += deltaX;
  proxy.y -= deltaY;
  proxy.yVelocity = deltaY;
  proxy.xVelocity = deltaX;

  Object.assign(actor, proxy);
}