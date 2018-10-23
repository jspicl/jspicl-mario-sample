import { createKeyframeAnimation } from "../factories";

export const blooper = {
  default: createKeyframeAnimation(9, 2, 0.5, 1, 1),
  run: createKeyframeAnimation(9, 2, 0.2, 1, 1)
};
