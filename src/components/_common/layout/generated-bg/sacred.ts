export function createSacredGeometry(x: number, y: number, width: number, height: number): { pattern: string } {
  const centerX = x + width / 2;
  const centerY = y + height / 2;
  const radius = Math.min(width, height) / 2;
  const innerRadius = radius * 0.4;
  const patternType = Math.floor(Math.random() * 5); // 5 different pattern types
  
  let path = '';
  
  switch (patternType) {
    case 0: // Flower of Life segment
      path = generateFlowerOfLife(centerX, centerY, radius);
      break;
    case 1: // Sri Yantra inspired
      path = generateSriYantra(centerX, centerY, radius);
      break;
    case 2: // Golden Spiral
      path = generateGoldenSpiral(centerX, centerY, radius);
      break;
    case 3: // Metatron's Cube inspired
      path = generateMetatronsCube(centerX, centerY, radius);
      break;
    case 4: // Sacred Geometry Star
      path = generateSacredStar(centerX, centerY, radius, innerRadius);
      break;
    default:
      // Fallback to simple mandala
      path = generateCircleFlower(centerX, centerY, radius);
  }
  
  return { pattern: path };
}

// Generate a Flower of Life pattern segment
function generateFlowerOfLife(centerX: number, centerY: number, radius: number): string {
  const circles = 3; // Number of circle layers
  const baseRadius = radius / circles;
  let path = '';
  
  // Draw the center circle
  path += `M ${centerX} ${centerY - baseRadius} A ${baseRadius} ${baseRadius} 0 1 1 ${centerX - 0.01} ${centerY - baseRadius} Z `;
  
  // Draw surrounding circles
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const cx = centerX + baseRadius * Math.cos(angle);
    const cy = centerY + baseRadius * Math.sin(angle);
    
    path += `M ${cx} ${cy - baseRadius} A ${baseRadius} ${baseRadius} 0 1 1 ${cx - 0.01} ${cy - baseRadius} Z `;
  }
  
  return path;
}

// Generate a Sri Yantra inspired pattern
function generateSriYantra(centerX: number, centerY: number, radius: number): string {
  let path = '';
  const triangleCount = 3;
  
  // Draw the inner and outer triangles
  for (let i = 0; i < triangleCount; i++) {
    const scale = 0.6 + (i * 0.2);
    const r = radius * scale;
    
    // Upward triangle
    path += `M ${centerX} ${centerY - r} `;
    path += `L ${centerX + r * 0.866} ${centerY + r * 0.5} `;
    path += `L ${centerX - r * 0.866} ${centerY + r * 0.5} Z `;
    
    // Downward triangle (slightly smaller)
    const r2 = r * 0.85;
    path += `M ${centerX} ${centerY + r2} `;
    path += `L ${centerX + r2 * 0.866} ${centerY - r2 * 0.5} `;
    path += `L ${centerX - r2 * 0.866} ${centerY - r2 * 0.5} Z `;
  }
  
  return path;
}

// Generate a Golden Spiral approximation
function generateGoldenSpiral(centerX: number, centerY: number, radius: number): string {
  let path = '';
  const totalSegments = 7;
  const growthFactor = 1.618; // Golden ratio
  
  let currentRadius = radius / 8;
  let currentAngle = 0;
  
  // Starting point
  path += `M ${centerX} ${centerY} `;
  
  for (let i = 0; i < totalSegments * 4; i++) {
    const angleIncrement = Math.PI / 2;
    const endAngle = currentAngle + angleIncrement;
    
    // Calculate end point of this arc
    const sweepFlag = 1; // Always go clockwise
    const x2 = centerX + currentRadius * Math.cos(endAngle);
    const y2 = centerY + currentRadius * Math.sin(endAngle);
    
    // Add arc segment
    path += `A ${currentRadius} ${currentRadius} 0 0 ${sweepFlag} ${x2} ${y2} `;
    
    // Update for next iteration
    currentAngle = endAngle;
    
    // Every 90 degrees (quarter circle), increase the radius
    if ((i + 1) % 1 === 0) {
      currentRadius = currentRadius * Math.pow(growthFactor, 0.25);
    }
  }
  
  return path;
}

// Generate a simplified version of Metatron's Cube
function generateMetatronsCube(centerX: number, centerY: number, radius: number): string {
  let path = '';
  const points = [];
  const numPoints = 6;
  
  // Generate points in a circle
  for (let i = 0; i < numPoints; i++) {
    const angle = (Math.PI * 2 * i) / numPoints;
    points.push({
      x: centerX + radius * 0.8 * Math.cos(angle),
      y: centerY + radius * 0.8 * Math.sin(angle)
    });
  }
  
  // Add center point
  points.push({ x: centerX, y: centerY });
  
  // Connect all points to each other
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      path += `M ${points[i].x} ${points[i].y} L ${points[j].x} ${points[j].y} `;
    }
  }
  
  return path;
}

// Generate a star pattern with inner and outer points
function generateSacredStar(centerX: number, centerY: number, outerRadius: number, innerRadius: number): string {
  let path = '';
  const numPoints = 8;
  
  path += 'M ';
  
  for (let i = 0; i < numPoints * 2; i++) {
    // Alternate between outer and inner radius
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (Math.PI * i) / numPoints;
    
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    
    path += `${x} ${y} `;
    
    if (i === 0) {
      path += 'L ';
    }
  }
  
  path += 'Z';
  return path;
}

// Generate a simple mandala flower pattern
function generateCircleFlower(centerX: number, centerY: number, radius: number): string {
  let path = '';
  const petalCount = 6;
  
  // Center circle
  path += `M ${centerX} ${centerY - radius * 0.3} `;
  path += `A ${radius * 0.3} ${radius * 0.3} 0 1 1 ${centerX - 0.01} ${centerY - radius * 0.3} Z `;
  
  // Petals
  for (let i = 0; i < petalCount; i++) {
    const angle = (Math.PI * 2 * i) / petalCount;
    const petalCenterX = centerX + radius * 0.6 * Math.cos(angle);
    const petalCenterY = centerY + radius * 0.6 * Math.sin(angle);
    
    path += `M ${petalCenterX} ${petalCenterY - radius * 0.35} `;
    path += `A ${radius * 0.35} ${radius * 0.35} 0 1 1 ${petalCenterX - 0.01} ${petalCenterY - radius * 0.35} Z `;
  }
  
  return path;
}
