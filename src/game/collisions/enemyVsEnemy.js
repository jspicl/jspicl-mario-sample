import { DIRECTION_RIGHT, DIRECTION_LEFT } from "../constants";
import { enemyDead } from "../states/enemyDead";

export function enemyVsEnemy (enemy1, enemy2) {
  if (enemy1.status === "slidingshell" && enemy2.status === "slidingshell") {
    enemy1.updateState = enemyDead;
    enemy2.updateState = enemyDead;
  }
  else if (enemy1.status === "slidingshell") {
    enemy2.updateState = enemyDead;
  }
  else if (enemy2.status === "slidingshell") {
    enemy1.updateState = enemyDead;
  }
  else {
    enemy1.direction = enemy1.x > enemy2.x ? DIRECTION_RIGHT : DIRECTION_LEFT;
    enemy2.direction = enemy2.x > enemy1.x ? DIRECTION_RIGHT : DIRECTION_LEFT;
  }
}
