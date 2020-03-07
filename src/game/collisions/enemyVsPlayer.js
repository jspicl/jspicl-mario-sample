import { playerDead } from "../states/playerDead";
import { enemyShelled } from "../states/enemyShelled";
import { enemySlidingShell } from "../states/enemySlidingShell";
import { enemySquashed } from "../states/enemySquashed";
import { DIRECTION_LEFT, DIRECTION_RIGHT } from "../constants";

function setEnemySlideDirection (player, enemy, adjustPosition = true) {
  if (enemy.x < player.x) {
    enemy.direction = DIRECTION_LEFT;
    if (adjustPosition) {
      enemy.x = player.x - enemy.currentAnimation.width;
    }
  }
  else {
    enemy.direction = DIRECTION_RIGHT;
    if (adjustPosition) {
      enemy.x = player.x + player.currentAnimation.width;
    }
  }
}

export function enemyVsPlayer (actor1, actor2) {
  let player;
  let enemy;
  if (actor1.type === "player") {
    player = actor1;
    enemy = actor2;
  }
  else {
    player = actor2;
    enemy = actor1;
  }

  if (player.y + player.currentAnimation.height < enemy.y + 5) {
    if (enemy.status === "shelled") {
      enemy.updateState = enemySlidingShell;
      setEnemySlideDirection(player, enemy, false);
    }
    else if (enemy.status === "slidingshell") {
      enemy.updateState = enemyShelled;
    }
    else {
      enemy.health = Math.max(enemy.health - 1, 0);
      if (enemy.health === 1) {
        enemy.updateState = enemyShelled;
      }

      if (enemy.health === 0) {
        enemy.updateState = enemySquashed;
      }
    }

    player.yVelocity = -50;
    player.y = enemy.y - enemy.currentAnimation.height;
  }
  else if (enemy.status === "shelled") {
    enemy.updateState = enemySlidingShell;
    setEnemySlideDirection(player, enemy);
  }
  else {
    player.health = Math.max(player.health - 1, 0);
    if (player.health === 0) {
      player.updateState = playerDead;
    }
  }
}
