import { createKeyframeAnimation } from "../factories";

export const spiny = {
  default: createKeyframeAnimation(21, 1, 1, 1, 1),
  run: createKeyframeAnimation(21, 2, 0.3, 1, 1)
};
