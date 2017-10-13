import { getInput } from "./input";
import { updatePhysics } from "./physics";
import { updateAnimation } from "./animation";
import { createActor } from "./factories";
import { RIGHT } from "./constants";
import { clearLog } from "./debug";
import * as SPRITES from "./sprites";

export {
  init,
  update,
  draw
};

let actors = [];
let player;

function init () {
  player = createActor({
    x: 40,
    top: 30,
    direction: RIGHT,
    sprites: SPRITES.mario,
    moveVelocity: 0.7,
    jumpVelocity: 2
  });

  actors.push(player);
}

function update (elapsedTime) {
  clearLog();
  player.input = getInput();

  actors.forEach(actor => {
    updatePhysics(actor, elapsedTime);
    updateAnimation(actor, elapsedTime);
  });
}

function draw () {
  const cameraX = player.x - 60;
  const cameraY = player.y - 60;

  rectfill(cameraX - 1, cameraY - 1, cameraX + 129, cameraY + 129, 0);
  camera(cameraX, cameraY);

  map(Math.floor(cameraX / 8), Math.floor(cameraY / 8), Math.floor(cameraX / 8) * 8, Math.floor(cameraY / 8) * 8, 17, 17);

  actors.forEach(actor => {
    const sprite = actor.current;
    spr(sprite.index + Math.floor(actor.cursor) * sprite.widthUnits, actor.x, actor.y, sprite.widthUnits, sprite.heightUnits, actor.direction === RIGHT);
  });
}
