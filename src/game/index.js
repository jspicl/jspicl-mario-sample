import { createActor } from "./factories";
import { DIRECTION_RIGHT, DIRECTION_LEFT } from "./constants";
import { renderMap } from "./render/render-map";
import { checkForCollisionsAgainstActors } from "./physics";
import * as SPRITES from "./sprites";
import * as STATES from "./states";

let actors = [];
let player;
let camera;

function reset () {
  actors = [];
  camera = createActor({
    type: "camera",
    updateState: STATES.camera,
    allowRendering: false,
    sprites: {
      default: {
        width: 128,
        height: 128
      }
    }
  });

  player = createActor({
    type: "player",
    allowRendering: true,
    updateState: STATES.player,
    x: 10,
    y: 30,
    maxMoveVelocity: 48,
    direction: DIRECTION_RIGHT,
    sprites: SPRITES.mario
  });

  actors.push(createActor({
    updateState: STATES.enemy,
    x: 60,
    y: 30,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.goomba
  }));

  actors.push(createActor({
    updateState: STATES.enemy,
    x: 82,
    y: 30,
    health: 2,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.koopa
  }));

  actors.push(createActor({
    updateState: STATES.enemy,
    x: 104,
    y: 30,
    health: 2,
    direction: DIRECTION_LEFT,
    sprites: SPRITES.koopa
  }));

  // actors.push(createActor({
  //   updateState: STATES.simpleEnemy,
  //   sprites: SPRITES.koopa,
  //   direction: DIRECTION_LEFT,
  //   x: 80
  // }));

  actors.push(player);
  actors.push(camera);

  actors.camera = camera;
  actors.player = player;
}

export function init () {
  reset();
}

export function update (elapsedTime) {
  cls();
  if (player.status === "dead") {
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
  const { currentAnimation, allowRendering } = actor;

  if (!allowRendering) {
    return;
  }

  spr(
    currentAnimation.index + actor.currentAnimationFrame,
    actor.x - camera.x,
    actor.y - currentAnimation.height,
    currentAnimation.widthCells,
    currentAnimation.heightCells,
    actor.facingDirection === DIRECTION_RIGHT,
    actor.flipV
  );
}

export function draw () {
  // cls();
  renderMap(camera.x, camera.y);

  // Render players and enemies
  actors.forEach(renderActor);
  print(actors.length, 0, 0, 14);
}
