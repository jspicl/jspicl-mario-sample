import { DIRECTION_RIGHT } from "./constants";
import { renderMap } from "./render/render-map";
import { checkForCollisionsAgainstActors } from "./physics";
import { cameraVsEnemy, enemyVsPlayer, enemyVsEnemy } from "./collisions";
import { createGoomba, createKoopa, createPlayerCamera, createPlayer, createRandomEnemy } from "./actorFactories";

let actors = [];
let player;
let camera;

const collisionActions = {
  enemyVsPlayer,
  enemyVsEnemy,
  cameraVsEnemy
};

function reset () {
  actors = [];
  camera = createPlayerCamera();

  player = createPlayer(10, 64);
  actors.push(createRandomEnemy(16 * 8, 64));

  actors.push(createRandomEnemy(32 * 8, 64));

  actors.push(createRandomEnemy(50 * 8, 64));
  actors.push(createRandomEnemy(52 * 8, 64));

  actors.push(createRandomEnemy(77 * 8, 24));
  actors.push(createRandomEnemy(79 * 8, 0));

  actors.push(createRandomEnemy(91 * 8, 64));
  actors.push(createRandomEnemy(92 * 8, 64));

  actors.push(createRandomEnemy(97 * 8, 64));

  actors.push(createRandomEnemy(106 * 8, 64));
  actors.push(createRandomEnemy(108 * 8, 64));
  actors.push(createRandomEnemy(110 * 8, 64));

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
    checkForCollisionsAgainstActors(actors, collisionActions);
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
    actor.y - currentAnimation.height - camera.y,
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
  print("ctrl+r to reload", 0, 0, 14);
}
