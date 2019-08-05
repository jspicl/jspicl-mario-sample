import { createActor } from "./factories";
import { CELL_SIZE, DIRECTION_RIGHT, DIRECTION_LEFT } from "./constants";
import { roundToNearestCell } from "./utils";
import * as SPRITES from "./sprites";
import * as STATES from "./states";
import { clearLog, clearDebugRender } from "./debug";

const actors = [];
let player;

export function init () {
  player = createActor({
    updateState: STATES.player,
    x: 40,
    y: 30,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.mario,
    moveVelocity: 0.85,
    jumpVelocity: 1.9
  });

  actors.push(createActor({
    updateState: STATES.simpleEnemy,
    sprites: SPRITES.goomba,
    direction: DIRECTION_LEFT,
    x: 120,
    moveVelocity: 0.28
  }));

  actors.push(player);
}

export function update (elapsedTime) {
  clearLog();
  clearDebugRender();
  actors.forEach(actor => {
    actor.updateState(actor, elapsedTime);
  });
}

function renderActor (actor) {
  const sprite = actor.currentAnimation;

  sspr(
    (sprite.index + Math.floor(actor.cursor) * sprite.widthUnits) % 16 * CELL_SIZE,
    Math.floor(sprite.index / 16) * CELL_SIZE,
    sprite.widthUnits * CELL_SIZE,
    sprite.heightUnits * CELL_SIZE,
    actor.x,
    actor.y,
    actor.scale * sprite.widthUnits * CELL_SIZE,
    actor.scale * sprite.heightUnits * CELL_SIZE,
    actor.direction === DIRECTION_RIGHT);
}

let cameraX = 0;

export function draw () {
  cameraX = Math.max(player.x - 60, cameraX);
  const cameraY = 0;

  cls();
  camera(cameraX, cameraY);

  // Draw the proper map region
  const xCell = roundToNearestCell(cameraX);
  const yCell = roundToNearestCell(cameraY);
  map(
    xCell,
    yCell,
    xCell * CELL_SIZE,
    yCell * CELL_SIZE,
    17, 17);

  // Render players and enemies
  actors.forEach(renderActor);
}
