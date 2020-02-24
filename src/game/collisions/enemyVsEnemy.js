import { DIRECTION_RIGHT, DIRECTION_LEFT } from "../constants";

export function enemyVsEnemy (enemy1, enemy2) {
  enemy1.direction = enemy1.x > enemy2.x ? DIRECTION_RIGHT : DIRECTION_LEFT;
  enemy2.direction = enemy2.x > enemy1.x ? DIRECTION_RIGHT : DIRECTION_LEFT;
}
