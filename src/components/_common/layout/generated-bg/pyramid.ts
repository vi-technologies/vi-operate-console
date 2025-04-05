export function createPyramid(x: number, y: number, width: number, height: number, depth: number) {
  // Create a pyramid shape with isometric projection
  const isoAngle = Math.PI / 6; // 30 degrees for isometric view
  const depthX = depth * Math.cos(isoAngle);
  const depthY = depth * Math.sin(isoAngle);
  
  // Calculate the pyramid apex using standard isometric projection
  const apexX = x + width / 2;
  const apexY = y - height;
  
  // Calculate the base corners with consistent projection
  const frontBottomLeft = [x, y + height];
  const frontBottomRight = [x + width, y + height];
  const backBottomLeft = [x + depthX, y + height - depthY];
  const backBottomRight = [x + width + depthX, y + height - depthY];
  
  // Define the faces
  // Front triangular face
  const frontFace = `M${frontBottomLeft[0]},${frontBottomLeft[1]} L${frontBottomRight[0]},${frontBottomRight[1]} L${apexX},${apexY} Z`;
  
  // Right triangular face - connecting front right to back right to apex
  const rightFace = `M${frontBottomRight[0]},${frontBottomRight[1]} L${backBottomRight[0]},${backBottomRight[1]} L${apexX},${apexY} Z`;
  
  // Left triangular face - connecting front left to back left to apex
  const leftFace = `M${frontBottomLeft[0]},${frontBottomLeft[1]} L${backBottomLeft[0]},${backBottomLeft[1]} L${apexX},${apexY} Z`;
  
  // Back triangular face - connecting back left to back right to apex
  const backFace = `M${backBottomLeft[0]},${backBottomLeft[1]} L${backBottomRight[0]},${backBottomRight[1]} L${apexX},${apexY} Z`;
  
  // Base square (optional, usually not visible)
  const baseFace = `M${frontBottomLeft[0]},${frontBottomLeft[1]} L${frontBottomRight[0]},${frontBottomRight[1]} L${backBottomRight[0]},${backBottomRight[1]} L${backBottomLeft[0]},${backBottomLeft[1]} Z`;
  
  return {
    frontFace,
    rightFace,
    leftFace,
    backFace,
    baseFace
  };
}
