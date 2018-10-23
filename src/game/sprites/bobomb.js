import { createKeyframeAnimation } from "../factories";

export const bobomb = {
  default: createKeyframeAnimation(26, 1, 1, 1, 1),
  run: createKeyframeAnimation(26, 2, 0.2, 1, 1)
};
