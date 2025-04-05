export function createBox(x: number, y: number, width: number, height: number, depth: number) {
  const frontBottomLeft = [x, y + height];
  const frontBottomRight = [x + width, y + height];
  const frontTopLeft = [x, y];
  const frontTopRight = [x + width, y];
  const backTopLeft = [x + depth, y - depth / 2];
  const backTopRight = [x + width + depth, y - depth / 2];
  const backBottomRight = [x + width + depth, y + height - depth / 2];
  const frontFace = `
      M ${frontBottomLeft[0]} ${frontBottomLeft[1]}
      L ${frontBottomRight[0]} ${frontBottomRight[1]}
      L ${frontTopRight[0]} ${frontTopRight[1]}
      L ${frontTopLeft[0]} ${frontTopLeft[1]}
      Z
    `;
  const topFace = `
      M ${frontTopLeft[0]} ${frontTopLeft[1]}
      L ${frontTopRight[0]} ${frontTopRight[1]}
      L ${backTopRight[0]} ${backTopRight[1]}
      L ${backTopLeft[0]} ${backTopLeft[1]}
      Z
    `;
  const rightFace = `
      M ${frontTopRight[0]} ${frontTopRight[1]}
      L ${frontBottomRight[0]} ${frontBottomRight[1]}
      L ${backBottomRight[0]} ${backBottomRight[1]}
      L ${frontTopRight[0]} ${frontTopRight[1]}
      Z
    `;
  return {
    frontFace,
    topFace,
    rightFace
  };
}
