import { createBox } from './box';

export function createSteppedShape(x: number, y: number, width: number, height: number, depth: number) {
  const stepCount = 3;
  const stepHeight = height / stepCount;
  const stepWidth = width / stepCount;
  const steps = [];
  for (let i = 0; i < stepCount; i++) {
    const stepX = x + i * stepWidth;
    const stepY = y + i * stepHeight;
    const currentWidth = width - i * stepWidth;
    const currentHeight = stepHeight;
    steps.push(createBox(stepX, stepY, currentWidth, currentHeight, depth));
  }
  return { steps };
}
