import { createKeyframeAnimation } from "../factories";

export const goomba = {
  default: createKeyframeAnimation(5, 1, 1, 1, 1),
  run: createKeyframeAnimation(5, 2, 0.3, 1, 1)
};
