import { createKeyframeAnimation } from "../factories";

export const mario = {
  default: createKeyframeAnimation(11, 1, 1, 2, 2),
  run: createKeyframeAnimation(1, 4, 0.15, 2, 2),
  jump: createKeyframeAnimation(9, 1, 1, 2, 2)
};