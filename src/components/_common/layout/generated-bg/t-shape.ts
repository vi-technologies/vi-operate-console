import { createBox } from './box';

export function createTShape(x: number, y: number, width: number, height: number, depth: number, armWidth: number) {
  const verticalBox = createBox(x + (width - armWidth) / 2, y, armWidth, height, depth);
  const horizontalBox = createBox(x, y, width, armWidth, depth);
  return {
    verticalFrontFace: verticalBox.frontFace,
    verticalTopFace: verticalBox.topFace,
    verticalRightFace: verticalBox.rightFace,
    horizontalFrontFace: horizontalBox.frontFace,
    horizontalTopFace: horizontalBox.topFace,
    horizontalRightFace: horizontalBox.rightFace
  };
}
