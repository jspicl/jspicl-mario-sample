import { createKeyframeAnimation } from "../factories";

export const mario = {
  default: createKeyframeAnimation(2, 1, 1, 1, 1),
  run: createKeyframeAnimation(1, 2, 0.15, 1, 1),
  jump: createKeyframeAnimation(3, 1, 1, 1, 1),
  shoot: createKeyframeAnimation(1, 1, 1, 1, 1),
  dead: createKeyframeAnimation(4, 1, 1, 1, 1)
};
