export {
  getInput
};

function getInput () {
  return {
    moveLeft: btn(0, 0),
    moveRight: btn(1, 0),
    jump: btn(4, 0)
  };
}