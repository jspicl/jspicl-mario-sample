import { createKeyframeAnimation } from "../animation";

export const buzzyBeetle = {
  default: createKeyframeAnimation(23, 1, 1, 1, 1),
  run: createKeyframeAnimation(23, 2, 0.3, 1, 1)
};
