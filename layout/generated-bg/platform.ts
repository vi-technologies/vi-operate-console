import { createBox } from './box';

export function createPlatform(x: number, y: number, width: number, depth: number) {
  const height = 20;
  return createBox(x, y, width, height, depth);
}
