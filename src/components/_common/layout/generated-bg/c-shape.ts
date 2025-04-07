import { createBox } from './box';

export function createCShape(x: number, y: number, width: number, height: number, depth: number, armWidth: number) {
  // Create three boxes that form a C shape when put together
  // But modify their positions to appear more connected
  
  // Top horizontal part of C
  const topY = y;
  const topBox = createBox(x, topY, width, armWidth, depth);
  
  // Left vertical part of C
  const leftX = x;
  const leftY = y + armWidth; // Connect directly to top box
  const leftHeight = height - 2 * armWidth; // Connect to both top and bottom
  const leftBox = createBox(leftX, leftY, armWidth, leftHeight, depth);
  
  // Bottom horizontal part of C
  const bottomY = y + height - armWidth;
  const bottomBox = createBox(x, bottomY, width, armWidth, depth);
  
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
