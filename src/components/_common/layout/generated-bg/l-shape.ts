import { createBox } from './box';

export function createLShape(x: number, y: number, width: number, height: number, depth: number, armWidth: number) {
  const baseBox = createBox(x, y, width, height, depth);
  const armBox = createBox(x, y + height - armWidth, width + armWidth, armWidth, depth);
  return {
    ...baseBox,
    armFrontFace: armBox.frontFace,
    armTopFace: armBox.topFace,
    armRightFace: armBox.rightFace
  };
}
