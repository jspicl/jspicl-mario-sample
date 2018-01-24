import { CELL_SIZE } from "./constants";

export function roundToNearestCell (value) {
  return Math.floor(value / CELL_SIZE);
}
