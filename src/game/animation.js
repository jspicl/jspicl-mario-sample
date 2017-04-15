export {
  updateAnimation
};

function updateAnimation (actor, elapsedTime) {
  const current = actor.current;

  if (actor.yVelocity !== 0) {
    actor.current = actor.sprites.jump;
  }
  else if (actor.xVelocity !== 0) {
    actor.current = actor.sprites.run;
  }
  else if (actor.xVelocity === 0) {
    actor.current = actor.sprites.default;
  }

  if (actor.current !== current) {
    actor.cursor = 0;
  }

  actor.current = actor.current || actor.sprites.default;

  animate(actor, elapsedTime);
}

function animate(actor, elapsedTime) {
  actor.cursor = (actor.cursor + elapsedTime / actor.current.duration) % actor.current.frames;
}