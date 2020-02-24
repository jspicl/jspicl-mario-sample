import { roundToNearestCell } from "../utils";
import { CELL_SIZE } from "../constants";

export function renderMap (cameraX, cameraY) {
  const xCell = roundToNearestCell(cameraX);
  const yCell = roundToNearestCell(cameraY);
  map(
    xCell,
    yCell,
    xCell * CELL_SIZE - cameraX,
    0,
    17, 17);
}
