import { createKeyframeAnimation } from "../factories";

export const koopa = {
  default: createKeyframeAnimation(8, 1, 1, 1, 1),
  run: createKeyframeAnimation(8, 2, 0.3, 1, 1)
};
