export {
  createActor,
  createKeyframeAnimation
};

function createActor({
  x = 0,
  y = 0,
  health = 1000,
  direction = 0,
  sprites,
  xVelocity = 0,
  yVelocity = 0,
  moveVelocity = 0.687,
  jumpVelocity = 2.41
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

    xVelocity,
    yVelocity,
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