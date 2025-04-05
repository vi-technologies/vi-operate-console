import { createBox } from './box';

export function createUShape(x: number, y: number, width: number, height: number, depth: number, armWidth: number) {
  const leftBox = createBox(x, y, armWidth, height, depth);
  const rightBox = createBox(x + width - armWidth, y, armWidth, height, depth);
  const bottomBox = createBox(x, y + height - armWidth, width, armWidth, depth);
  return {
    leftFrontFace: leftBox.frontFace,
    leftTopFace: leftBox.topFace,
    leftRightFace: leftBox.rightFace,
    rightFrontFace: rightBox.frontFace,
    rightTopFace: rightBox.topFace,
    rightRightFace: rightBox.rightFace,
    bottomFrontFace: bottomBox.frontFace,
    bottomTopFace: bottomBox.topFace,
    bottomRightFace: bottomBox.rightFace
  };
}
