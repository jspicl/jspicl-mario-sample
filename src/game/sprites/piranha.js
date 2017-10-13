import { createKeyframeAnimation } from "../factories";

export const piranha = {
  default: createKeyframeAnimation(28, 1, 0, 2, 1),
  attack: createKeyframeAnimation(28, 2, 0.4, 2, 1)
};
