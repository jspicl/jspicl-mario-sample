import { LEFT, RIGHT, TERMINAL_VELOCITY, GRAVITY } from "./constants";

export {
  updatePhysics
};

function isTraversableHorizontal (actor, widthUnits, heightUnits) {
  const flag = 1;
  const left = Math.floor(actor.x / 8);
  const top = Math.floor(actor.y / 8);
  const bottom = top + heightUnits;
  const right =  Math.floor((actor.x + 15.99) / 8);

  return {
    isCollidingLeft: fget(mget(left, top), flag) || fget(mget(left, bottom), flag),
    isCollidingRight: fget(mget(right, top), flag) || fget(mget(right, bottom), flag)
  };
}

function isTraversableVertical (actor, widthUnits, heightUnits) {
  const flag = 0;
  const left = Math.floor(actor.x / 8);
  const top = Math.floor(actor.y / 8);
  const bottom = top + heightUnits;
  const right =  Math.floor((actor.x + 15.99) / 8);

  return {
    isCollidingTop: fget(mget(left, top), flag) || fget(mget(right, top), flag),
    isCollidingBottom: fget(mget(left, bottom), flag) || fget(mget(right, bottom), flag)
  };
}

function updatePhysics (actor, elapsedTime) {
  const proxy = Object.assign({}, actor);

  const direction = proxy.input.moveLeft && LEFT || proxy.input.moveRight && RIGHT || 0;
  proxy.xVelocity = direction * proxy.moveVelocity;
  proxy.yVelocity = Math.max(TERMINAL_VELOCITY, proxy.yVelocity - GRAVITY);

  if (direction !== 0) {
    proxy.direction = direction;
  }

  if (proxy.input.jump && proxy.jumpTime < 0.2) {
    proxy.yVelocity = proxy.jumpVelocity;
    proxy.jumpTime += elapsedTime;
  }

  proxy.x += proxy.xVelocity;
  proxy.y -= proxy.yVelocity;

  const leftRightCollisionInfo = isTraversableHorizontal(proxy, actor.current.widthUnits, actor.current.heightUnits);
  if (leftRightCollisionInfo.isCollidingLeft) {
    proxy.x = (Math.floor(proxy.x / 8) + 1) * 8;
    proxy.xVelocity = 0;
  }

  if (leftRightCollisionInfo.isCollidingRight) {
    proxy.x = Math.floor(proxy.x / 8) * 8;
    proxy.xVelocity = 0;
  }

  const topBottomCollisionInfo = isTraversableVertical(proxy, actor.current.widthUnits, actor.current.heightUnits);
  if (topBottomCollisionInfo.isCollidingTop) {
    proxy.y = (Math.floor(proxy.y / 8) + 1) * 8;
    proxy.yVelocity = 0;
    proxy.jumpTime = 0.2;
    proxy.input.jump = false;
  }

  if (topBottomCollisionInfo.isCollidingBottom) {
    proxy.y = Math.floor(proxy.y / 8) * 8;
    proxy.yVelocity = 0;
    proxy.jumpTime = 0;
  }

  Object.assign(actor, proxy);
}