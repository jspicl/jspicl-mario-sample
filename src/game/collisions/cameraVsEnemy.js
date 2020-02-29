export function cameraVsEnemy (enemy1, enemy2) {
  const enemy = enemy1.type === "camera" ? enemy2 : enemy1;

  enemy.allowUpdating = true;
  enemy.allowRendering = true;
}
