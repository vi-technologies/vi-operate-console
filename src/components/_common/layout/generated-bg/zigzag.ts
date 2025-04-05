import { createBox, isoAngle } from './box';

export function createZigzag(
  x: number, 
  y: number, 
  width: number, 
  height: number, 
  depth: number, 
  segments = 4
) {
  // Create a clean zigzag pattern
  const depthX = depth * Math.cos(isoAngle);
  const depthY = depth * Math.sin(isoAngle);
  
  // Fixed segment size for more consistent appearance
  const segmentWidth = width / segments;
  const segmentHeight = height / segments;
  const parts = [];
  
  // Create a true zigzag pattern
  for (let i = 0; i < segments; i++) {
    // Alternate between high and low positions
    const isEven = i % 2 === 0;
    const yOffset = isEven ? 0 : segmentHeight * 0.8;
    
    const partX = x + i * segmentWidth;
    const partY = y + yOffset;
    
    // Make the zigzag pieces slightly smaller for aesthetics
    const adjustedWidth = segmentWidth * 0.9;
    const adjustedHeight = segmentHeight * 0.7;
    
    // Center each segment
    const offsetX = (segmentWidth - adjustedWidth) / 2;
    
    // Create the box for this segment
    const partBox = createBox(
      partX + offsetX, 
      partY, 
      adjustedWidth, 
      adjustedHeight, 
      depth
    );
    
    parts.push({
      frontFace: partBox.frontFace,
      topFace: partBox.topFace,
      rightFace: partBox.rightFace
    });
  }
  
  return { parts };
}
