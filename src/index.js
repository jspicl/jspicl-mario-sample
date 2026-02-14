/// <reference types="@jspicl/core/pic8-api.d.ts" />
import { init, draw, update } from "./game";

/* eslint-disable no-underscore-dangle */
function _init() {
  init();
}

function _update60() {
  update(1 / 60);
}

function _draw() {
  draw();
}
