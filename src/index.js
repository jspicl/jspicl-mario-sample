import { init, draw, update } from "./game";

/* eslint-disable no-underscore-dangle */
function _init () {
  init();
}

function _update60 () {
  update(1 / 60);
}

function _draw () {
  draw();
}

// <!-- DEBUG
_init();
_update60();
_draw();
// -->
