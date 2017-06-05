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
  const x1 = proxy.x + deltaX;
  const y1 = proxy.y - deltaY;
  const xm = x1 + 4;
  const ym = y1 + 4;
  const x2 = x1 + 8;
  const y2 = y1 + 8;

  // isColldingLeft
  if (isSolid(x1, ym) && (isSolid(x1, y1) || isSolid(x1, y2))) {
    proxy.x = (roundToNearestCell(x1) + 1) * 8;
    deltaX = 0;
  }

  // isColldingRight
  if (isSolid(x2, ym) && (isSolid(x2, y1) || isSolid(x2, y2))) {
    proxy.x = roundToNearestCell(x1) * 8;
    deltaX = 0;
  }

  const isCollidingBottom = isSolid(xm, y2) && (isSolid(x1, y2) || isSolid(x2, y2));
  if (isCollidingBottom) {
    proxy.y = roundToNearestCell(y1) * 8;
    proxy.jumpTime = 0;
    proxy.input.jump = false;
    deltaY = 0;
  }

  const isCollidingTop = isSolid(xm, y1) && (isSolid(x1, y1) || isSolid(x2, y1));
  if (isCollidingTop && !isCollidingBottom) {
    proxy.y = (roundToNearestCell(y1) + 1) * 8;
    proxy.yVelocity = 0;
    proxy.jumpTime = 0.2;
    deltaY = 0;
  }

  proxy.x += deltaX;
  proxy.y -= deltaY;
  proxy.yVelocity = deltaY;
  proxy.xVelocity = deltaX;

  Object.assign(actor, proxy);
}