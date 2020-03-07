import { createKeyframeAnimation } from "../factories";

export const goomba = {
  default: createKeyframeAnimation(5, 1, 1, 1, 1),
  run: createKeyframeAnimation(5, 2, 0.5, 1, 1),
  squashed: createKeyframeAnimation(7, 1, 1, 1, 1),
  dead: createKeyframeAnimation(5, 1, 1, 1, 1)
};
