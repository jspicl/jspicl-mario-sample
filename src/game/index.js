import { createActor } from "./factories";
import { DIRECTION_RIGHT, DIRECTION_LEFT } from "./constants";
import { renderMap } from "./render/render-map";
import { checkForCollisionsAgainstActors } from "./physics";
import * as SPRITES from "./sprites";
import * as STATES from "./states";

let actors = [];
let player;
let cameraX = 0;
const cameraY = 0;

function reset () {
  cameraX = 0;
  actors = [];
  player = createActor({
    type: "player",
    updateState: STATES.player,
    x: 10,
    y: 30,
    maxMoveVelocity: 48,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.mario
  });

  actors.push(createActor({
    updateState: STATES.simpleEnemy,
    x: 60,
    y: 30,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.goomba
  }));

  actors.push(createActor({
    updateState: STATES.simpleEnemy,
    x: 70,
    y: 30,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.goomba
  }));

  actors.push(createActor({
    updateState: STATES.simpleEnemy,
    x: 80,
    y: 30,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.goomba
  }));

  // actors.push(createActor({
  //   updateState: STATES.simpleEnemy,
  //   sprites: SPRITES.koopa,
  //   direction: DIRECTION_LEFT,
  //   x: 80
  // }));

  actors.push(player);
}

export function init () {
  reset();
}

export function update (elapsedTime) {
  cls();
  if (player.dead) {
    player.updateState(player, actors, elapsedTime);
    if (player.reset) {
      reset();
    }
  }
  else {
    actors.forEach(actor => actor.updateState(actor, actors, elapsedTime));
    checkForCollisionsAgainstActors(actors);
  }
}

function renderActor (actor) {
  const { currentAnimation } = actor;

  spr(
    currentAnimation.index + actor.currentAnimationFrame,
    actor.x - cameraX,
    actor.y - currentAnimation.height,
    currentAnimation.widthCells,
    currentAnimation.heightCells,
    actor.facingDirection === DIRECTION_RIGHT);
}

export function draw () {
  cameraX = Math.max(player.x - 60, cameraX);

  // cls();
  renderMap(cameraX, cameraY);

  // Render players and enemies
  actors.forEach(renderActor);
}
