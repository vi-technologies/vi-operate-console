export const isoAngle = Math.PI / 6; // 30 degrees for isometric view

export function createBox(x: number, y: number, width: number, height: number, depth: number) {
  // Ensure proper isometric projection
  const depthX = depth * Math.cos(isoAngle);
  const depthY = depth * Math.sin(isoAngle);
  
  // Front face vertices
  const frontBottomLeft = [x, y + height];
  const frontBottomRight = [x + width, y + height];
  const frontTopLeft = [x, y];
  const frontTopRight = [x + width, y];
  
  // Back face vertices (with proper isometric projection)
  const backBottomLeft = [x + depthX, y + height - depthY];
  const backBottomRight = [x + width + depthX, y + height - depthY];
  const backTopLeft = [x + depthX, y - depthY];
  const backTopRight = [x + width + depthX, y - depthY];
  
  // Clean up the path strings - no extra whitespace or newlines
  const frontFace = `M${frontBottomLeft[0]},${frontBottomLeft[1]} L${frontBottomRight[0]},${frontBottomRight[1]} L${frontTopRight[0]},${frontTopRight[1]} L${frontTopLeft[0]},${frontTopLeft[1]} Z`;
  
  const topFace = `M${frontTopLeft[0]},${frontTopLeft[1]} L${frontTopRight[0]},${frontTopRight[1]} L${backTopRight[0]},${backTopRight[1]} L${backTopLeft[0]},${backTopLeft[1]} Z`;
  
  const rightFace = `M${frontTopRight[0]},${frontTopRight[1]} L${frontBottomRight[0]},${frontBottomRight[1]} L${backBottomRight[0]},${backBottomRight[1]} L${backTopRight[0]},${backTopRight[1]} Z`;
  
  return {
    frontFace,
    topFace,
    rightFace
  };
}
