export function createHexagon(x: number, y: number, radius: number) {
  // Create a more interesting hexagon with inner detail
  const outerRadius = radius;
  const innerRadius = radius * 0.7;
  const smallInnerRadius = radius * 0.4;
  
  // More precise angle calculation
  const angle = Math.PI / 3; // 60 degrees
  
  // Create outer hexagon
  let outerPath = '';
  let innerPath = '';
  let centerPattern = '';
  
  // Generate outer hexagon points
  const outerPoints = [];
  const innerPoints = [];
  
  for (let i = 0; i < 6; i++) {
    const theta = angle * i;
    // Rotate by 30 degrees to get flat top hexagon
    const rotatedTheta = theta + Math.PI / 6;
    
    // Calculate outer and inner points
    const pxOuter = x + outerRadius * Math.cos(rotatedTheta);
    const pyOuter = y + outerRadius * Math.sin(rotatedTheta);
    outerPoints.push([pxOuter, pyOuter]);
    
    const pxInner = x + innerRadius * Math.cos(rotatedTheta);
    const pyInner = y + innerRadius * Math.sin(rotatedTheta);
    innerPoints.push([pxInner, pyInner]);
  }
  
  // Create outer hexagon path
  outerPath = outerPoints.map((point, i) => 
    i === 0 ? `M${point[0]},${point[1]}` : `L${point[0]},${point[1]}`
  ).join(' ') + ' Z';
  
  // Create inner hexagon path
  innerPath = innerPoints.map((point, i) => 
    i === 0 ? `M${point[0]},${point[1]}` : `L${point[0]},${point[1]}`
  ).join(' ') + ' Z';
  
  // Create center pattern (a six-pointed star)
  for (let i = 0; i < 6; i++) {
    const theta1 = angle * i + Math.PI / 6;
    const theta2 = angle * ((i + 2) % 6) + Math.PI / 6;
    
    const px1 = x + smallInnerRadius * Math.cos(theta1);
    const py1 = y + smallInnerRadius * Math.sin(theta1);
    const px2 = x + smallInnerRadius * Math.cos(theta2);
    const py2 = y + smallInnerRadius * Math.sin(theta2);
    
    centerPattern += `M${x},${y} L${px1},${py1} M${x},${y} L${px2},${py2} `;
  }
  
  // Combine all paths
  const combinedPath = `${outerPath} ${innerPath} ${centerPattern}`;
  
  return { frontFace: combinedPath };
}
