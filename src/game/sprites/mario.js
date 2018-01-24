import { createKeyframeAnimation } from "../factories";

export const mario = {
  default: createKeyframeAnimation(1, 1, 1, 1, 1),
  run: createKeyframeAnimation(2, 2, 0.15, 1, 1),
  jump: createKeyframeAnimation(4, 1, 1, 1, 1),
  shoot: createKeyframeAnimation(1, 1, 1, 1, 1)
};
