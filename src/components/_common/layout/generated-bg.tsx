import React, { useMemo } from 'react';

const BackgroundComponent = ({
  children,
  shapeCount = 15,
  strokeColor = '#D0D0D0',
  strokeWidth = 1.5,
  fillColor = 'white',
  seed = Date.now()
}) => {
  // Helper functions for randomization with seed
  const createRandomGenerator = (seed) => {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  };

  // Create a hexagon shape (sacred geometry)
  const createHexagon = (x, y, radius) => {
    const angle = Math.PI / 3; // 60 degrees
    let path = '';
    for (let i = 0; i < 6; i++) {
      const theta = angle * i;
      const px = x + radius * Math.cos(theta);
      const py = y + radius * Math.sin(theta);
      path += (i === 0 ? `M ${px} ${py}` : ` L ${px} ${py}`);
    }
    path += ' Z';
    return { frontFace: path };
  };

  const random = createRandomGenerator(seed);

  // Generate random number in range
  const randomRange = (min, max) => min + random() * (max - min);

  // Create an isometric 3D box
  const createBox = (x, y, width, height, depth) => {
    // Base coordinates
    const frontBottomLeft = [x, y + height];
    const frontBottomRight = [x + width, y + height];
    const frontTopLeft = [x, y];
    const frontTopRight = [x + width, y];

    // Top face coordinates
    const backTopLeft = [x + depth, y - depth / 2];
    const backTopRight = [x + width + depth, y - depth / 2];

    // Right face coordinates
    const backBottomRight = [x + width + depth, y + height - depth / 2];

    // Paths for each face
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
      L ${backTopRight[0]} ${backTopRight[1]}
      Z
    `;

    return {
      frontFace,
      topFace,
      rightFace
    };
  };

  // Create an L-shaped 3D object
  const createLShape = (x, y, width, height, depth, armWidth) => {
    // Base box
    const baseBox = createBox(x, y, width, height, depth);

    // L arm box
    const armBox = createBox(
      x,
      y + height - armWidth,
      width + armWidth,
      armWidth,
      depth
    );

    return {
      ...baseBox,
      armFrontFace: armBox.frontFace,
      armTopFace: armBox.topFace,
      armRightFace: armBox.rightFace
    };
  };

  // Create a U-shaped 3D object
  const createUShape = (x, y, width, height, depth, armWidth) => {
    // Left vertical box
    const leftBox = createBox(x, y, armWidth, height, depth);

    // Right vertical box
    const rightBox = createBox(
      x + width - armWidth,
      y,
      armWidth,
      height,
      depth
    );

    // Bottom horizontal box
    const bottomBox = createBox(
      x,
      y + height - armWidth,
      width,
      armWidth,
      depth
    );

    return {
      leftFrontFace: leftBox.frontFace,
      leftTopFace: leftBox.topFace,
      leftRightFace: leftBox.rightFace,
      rightFrontFace: rightBox.frontFace,
      rightTopFace: rightBox.topFace,
      rightRightFace: rightBox.rightFace,
      bottomFrontFace: bottomBox.frontFace,
      bottomTopFace: bottomBox.topFace,
      bottomRightFace: bottomBox.rightFace
    };
  };

  // Create a C-shaped 3D object
  const createCShape = (x, y, width, height, depth, armWidth) => {
    // Top horizontal box
    const topBox = createBox(x, y, width, armWidth, depth);

    // Left vertical box
    const leftBox = createBox(x, y, armWidth, height, depth);

    // Bottom horizontal box
    const bottomBox = createBox(
      x,
      y + height - armWidth,
      width,
      armWidth,
      depth
    );

    return {
      topFrontFace: topBox.frontFace,
      topTopFace: topBox.topFace,
      topRightFace: topBox.rightFace,
      leftFrontFace: leftBox.frontFace,
      leftTopFace: leftBox.topFace,
      leftRightFace: leftBox.rightFace,
      bottomFrontFace: bottomBox.frontFace,
      bottomTopFace: bottomBox.topFace,
      bottomRightFace: bottomBox.rightFace
    };
  };

  // Create a T-shaped 3D object
  const createTShape = (x, y, width, height, depth, armWidth) => {
    // Vertical box
    const verticalBox = createBox(
      x + (width - armWidth) / 2,
      y,
      armWidth,
      height,
      depth
    );

    // Top horizontal box
    const horizontalBox = createBox(x, y, width, armWidth, depth);

    return {
      verticalFrontFace: verticalBox.frontFace,
      verticalTopFace: verticalBox.topFace,
      verticalRightFace: verticalBox.rightFace,
      horizontalFrontFace: horizontalBox.frontFace,
      horizontalTopFace: horizontalBox.topFace,
      horizontalRightFace: horizontalBox.rightFace
    };
  };

  // Create a platform shape (flat rectangle)
  const createPlatform = (x, y, width, depth) => {
    const height = 20; // Very short height for a platform
    return createBox(x, y, width, height, depth);
  };

  // Create a stepped/stair shape
  const createSteppedShape = (x, y, width, height, depth) => {
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

    return {
      steps
    };
  };

  // Create a zigzag shape
  const createZigzag = (x, y, width, height, depth, segments = 3) => {
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

    return {
      parts
    };
  };

  // Generate pixel art style squares for the background
  const generatedShapes = useMemo(() => {
    const shapes = [];
    const viewWidth = 1200;
    const viewHeight = 800;
    const tileSize = 20;
    const columns = Math.floor(viewWidth / tileSize);
    const rows = Math.floor(viewHeight / tileSize);
    const palette = ['#A8A8A8', '#CCCCCC', '#888888', '#EEEEEE', '#666666'];
  
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < columns; c++) {
        // 30% chance to leave the tile blank for variation
        if (Math.random() < 0.3) continue;
        const x = c * tileSize;
        const y = r * tileSize;
        const color = palette[Math.floor(Math.random() * palette.length)];
        shapes.push({
          key: `tile-${r}-${c}`,
          x,
          y,
          tileSize,
          color
        });
      }
    }
    return shapes;
  }, [seed]);

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden bg-white">
      {/* Isometric 3D shapes */}
      <div suppressHydrationWarning className="absolute inset-0 overflow-hidden">
        {mounted && (
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1200 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
          {/* Render the pixel art style squares */}
          {generatedShapes.map((tile) => (
            <rect
              key={tile.key}
              x={tile.x}
              y={tile.y}
              width={tile.tileSize}
              height={tile.tileSize}
              fill={tile.color}
            />
          ))}
          </svg>
        )}
      </div>

      {/* Center content */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="max-w-3xl w-full px-6">{children}</div>
      </div>
    </div>
  );
};

export default BackgroundComponent;
