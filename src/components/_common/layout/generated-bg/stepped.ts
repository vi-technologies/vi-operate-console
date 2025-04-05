import { createBox, isoAngle } from './box';

export function createSteppedShape(x: number, y: number, width: number, height: number, depth: number) {
  // Create a more visually appealing stepped shape
  const stepCount = 4; // Increase step count for more detail
  const stepHeight = height / stepCount;
  
  // Use variable step widths for more interesting shape
  const steps = [];
  let currentY = y + height; // Start from the bottom
  
  // Calculate isometric projection factors for decorative elements
  const depthX = depth * Math.cos(isoAngle);
  const depthY = depth * Math.sin(isoAngle);
  
  for (let i = 0; i < stepCount; i++) {
    // Use a non-linear function for step widths to create a more organic look
    const progressFactor = Math.pow((i + 1) / stepCount, 1.2);
    const currentWidth = width * (1 - progressFactor * 0.8);
    
    // Center each step
    const offset = (width - currentWidth) / 2;
    const stepX = x + offset;
    
    // Create the base box for this step
    const stepBox = createBox(stepX, currentY - stepHeight, currentWidth, stepHeight, depth);
    
    // Add a decorative element on each step (except the top one)
    if (i < stepCount - 1) {
      const centerX = stepX + currentWidth / 2;
      const topY = currentY - stepHeight;
      
      // Add a small decorative line or shape on top of each step
      const decorativeLine = `M${centerX},${topY} L${centerX + depthX},${topY - depthY}`;
      
      // Add the decorative element to the top face
      const enhancedTopFace = `${stepBox.topFace} ${decorativeLine}`;
      
      steps.push({
        frontFace: stepBox.frontFace,
        topFace: enhancedTopFace,
        rightFace: stepBox.rightFace
      });
    } else {
      // For the top step, just use the clean box without decorations
      // This avoids visual artifacts at the top step
      steps.push({
        frontFace: stepBox.frontFace,
        topFace: stepBox.topFace,
        rightFace: stepBox.rightFace
      });
    }
    
    // Move to the next step position (moving upward)
    currentY -= stepHeight;
  }
  
  return { steps };
}
