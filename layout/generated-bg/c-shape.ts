import { createBox } from './box';

export function createCShape(x: number, y: number, width: number, height: number, depth: number, armWidth: number) {
  const topBox = createBox(x, y, width, armWidth, depth);
  const leftBox = createBox(x, y, armWidth, height, depth);
  const bottomBox = createBox(x, y + height - armWidth, width, armWidth, depth);
  return {
    topFrontFace: topBox.frontFace,
    topTopFace: topBox.topFace,
    topRightFace: topBox.rightFace,
    leftFrontFace: leftBox.frontFace,
    leftTopFace: leftBox.topFace,
    leftRightFace: leftBox.rightFace,
    bottomFrontFace: bottomBox.frontFace,
    bottomTopFace: bottomBox.topFace,
    bottomRightFace: bottomBox.rightFace
  };
}
