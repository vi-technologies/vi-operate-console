import { createBox } from './box';

export function createZigzag(x: number, y: number, width: number, height: number, depth: number, segments = 3) {
  const segmentWidth = width / segments;
  const segmentHeight = height / segments;
  const parts = [];
  for (let i = 0; i < segments; i++) {
    const isEven = i % 2 === 0;
    const partX = x + i * segmentWidth;
    const partY = isEven ? y : y + segmentHeight;
    const partHeight = isEven ? segmentHeight * 2 : segmentHeight;
    parts.push(createBox(partX, partY, segmentWidth, partHeight, depth));
  }
  return { parts };
}
