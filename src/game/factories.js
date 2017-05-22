export {
  createActor,
  createKeyframeAnimation
};

function createActor({
  x = 0,
  y = 0,
  health = 1000,
  direction = 0,
  xVelocity = 0,
  yVelocity = 0,
  sprites,
  moveAcceleration,
  moveVelocity,
  jumpVelocity,
  input
}) {
  return {
    x,
    y,
    cursor: 0,

    current: sprites.default,
    sprites,

    health,
    direction,

    jumpTime: 0,

    input,

    xVelocity,
    yVelocity,
    moveAcceleration,
    moveVelocity,
    jumpVelocity
  };
}

function createKeyframeAnimation (index, frames = 1, duration = 1, widthUnits = 1, heightUnits = 1) {
  return {
    index,
    frames,
    duration,
    widthUnits,
    heightUnits
  };
}