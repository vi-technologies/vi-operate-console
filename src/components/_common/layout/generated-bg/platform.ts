import { createBox, isoAngle } from './box';

export function createPlatform(x: number, y: number, width: number, depth: number) {
  // Create a more interesting platform with subtle details
  const height = 15; // Slightly lower height for a sleeker look
  const platformBox = createBox(x, y, width, height, depth);
  
  // Calculate isometric projection factors
  const depthX = depth * Math.cos(isoAngle);
  const depthY = depth * Math.sin(isoAngle);
  
  // Add decorative lines on the top face
  const decorativeLines = [];
  
  // Add three horizontal lines evenly spaced
  const lineSpacing = width / 4;
  for (let i = 1; i < 4; i++) {
    const lineX = x + lineSpacing * i;
    const startPoint = `${lineX},${y}`;
    const endPoint = `${lineX + depthX},${y - depthY}`;
    decorativeLines.push(`M${startPoint} L${endPoint}`);
  }
  
  // Add two vertical lines
  const vertLineSpacing = depth / 3;
  for (let i = 1; i < 3; i++) {
    const lineXOffset = vertLineSpacing * i * Math.cos(isoAngle);
    const lineYOffset = vertLineSpacing * i * Math.sin(isoAngle);
    const startPoint = `${x + lineXOffset},${y - lineYOffset}`;
    const endPoint = `${x + width + lineXOffset},${y - lineYOffset}`;
    decorativeLines.push(`M${startPoint} L${endPoint}`);
  }
  
  // Add the decorative lines to the top face path
  const enhancedTopFace = `${platformBox.topFace} ${decorativeLines.join(' ')}`;
  
  return {
    frontFace: platformBox.frontFace,
    topFace: enhancedTopFace,
    rightFace: platformBox.rightFace
  };
}
