import React, { useMemo } from 'react';
import { createHexagon } from '../../../../layout/generated-bg/hexagon';

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


  const random = createRandomGenerator(seed);

  // Generate random number in range
  const randomRange = (min, max) => min + random() * (max - min);

  import { createBox } from '../../../../layout/generated-bg/box';

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

  // Generate shapes for the background
  const generatedShapes = useMemo(() => {
    const shapes = [];
    const viewWidth = 1200;
    const viewHeight = 800;
  
    // Array to hold placed bounding boxes for collision detection
    const placedBoxes = [];
    let lastShapeType = -1;
  
    // Helper function to check overlap between two boxes
    const doesOverlap = (box, boxes) => {
      return boxes.some(b =>
        box.x < b.x + b.w &&
        box.x + box.w > b.x &&
        box.y < b.y + b.h &&
        box.y + box.h > b.y
      );
    };
  
    // Helper function to get a candidate position that doesn't overlap
    const getCandidate = (w, h) => {
      let attempts = 0;
      while (attempts < 100) {
        let x, y;
        const edgeChoice = random();
        if (edgeChoice < 0.5) {
          // Place shape on vertical edges
          if (random() < 0.5) {
            // left edge
            x = randomRange(0, Math.max(0, 300 - w));
          } else {
            // right edge
            x = randomRange(900, viewWidth - w);
          }
          y = randomRange(0, viewHeight - h);
        } else {
          // Place shape on horizontal edges
          if (random() < 0.5) {
            // top edge
            y = randomRange(0, Math.max(0, 200 - h));
          } else {
            // bottom edge
            y = randomRange(600, viewHeight - h);
          }
          x = randomRange(0, viewWidth - w);
        }
        const candidate = { x, y, w, h };
        if (!doesOverlap(candidate, placedBoxes)) {
          return candidate;
        }
        attempts++;
      }
      return null;
    };
  
    for (let i = 0; i < shapeCount; i++) {
      const width = randomRange(60, 100);
      const height = randomRange(60, 100);
      const depth = randomRange(20, 40);
      const armWidth = randomRange(20, 30);
  
      const candidate = getCandidate(width, height);
      if (!candidate) continue; // Skip if no non-overlapping position found
  
      placedBoxes.push(candidate);
      const { x, y } = candidate;
      let shapeType = Math.floor(random() * 9);
      if (shapeType === lastShapeType) {
        shapeType = (shapeType + 1) % 9;
      }
      lastShapeType = shapeType; // Ensure variety in shape types
  
      let shape;
      let key = `shape-${i}`;
  
      switch (shapeType) {
        case 0: // Simple box
          shape = createBox(x, y, width, height, depth);
          shapes.push({
            type: 'box',
            key,
            ...shape
          });
          break;
        case 1: // L shape
          shape = createLShape(x, y, width, height, depth, armWidth);
          shapes.push({
            type: 'l-shape',
            key,
            ...shape
          });
          break;
        case 2: // U shape
          shape = createUShape(x, y, width, height, depth, armWidth);
          shapes.push({
            type: 'u-shape',
            key,
            ...shape
          });
          break;
        case 3: // C shape
          shape = createCShape(x, y, width, height, depth, armWidth);
          shapes.push({
            type: 'c-shape',
            key,
            ...shape
          });
          break;
        case 4: // T shape
          shape = createTShape(x, y, width, height, depth, armWidth);
          shapes.push({
            type: 't-shape',
            key,
            ...shape
          });
          break;
        case 5: // Platform (flat rectangle)
          shape = createPlatform(x, y, width * 1.5, depth);
          shapes.push({
            type: 'platform',
            key,
            ...shape
          });
          break;
        case 6: // Stepped/stair shape
          shape = createSteppedShape(x, y, width, height, depth);
          shapes.push({
            type: 'stepped',
            key,
            steps: shape.steps
          });
          break;
        case 7: // Zigzag shape
          shape = createZigzag(x, y, width, height, depth);
          shapes.push({
            type: 'zigzag',
            key,
            parts: shape.parts
          });
          break;
        case 8: // Hexagon (sacred geometry)
          {
            const centerX = x + width / 2;
            const centerY = y + height / 2;
            const radius = Math.min(width, height) / 2;
            shape = createHexagon(centerX, centerY, radius);
            shapes.push({
              type: 'hexagon',
              key,
              ...shape
            });
          }
          break;
      }
    }
  
    return shapes;
  }, [shapeCount, seed]);

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
          {/* Render the generated shapes */}
          {generatedShapes.map((shape) => {
            if (shape.type === 'box') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.frontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.topFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 'l-shape') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.frontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.topFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.armFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.armTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.armRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 'u-shape') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.leftFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.leftTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.leftRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 'c-shape') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.topFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.topTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.topRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.leftFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.leftTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.leftRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.bottomRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 't-shape') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.verticalFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.verticalTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.verticalRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.horizontalFrontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.horizontalTopFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.horizontalRightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 'platform') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.frontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.topFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                  <path
                    d={shape.rightFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            } else if (shape.type === 'stepped') {
              return (
                <g key={shape.key}>
                  {shape.steps.map((step, i) => (
                    <g key={`${shape.key}-step-${i}`}>
                      <path
                        d={step.frontFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                      <path
                        d={step.topFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                      <path
                        d={step.rightFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                    </g>
                  ))}
                </g>
              );
            } else if (shape.type === 'zigzag') {
              return (
                <g key={shape.key}>
                  {shape.parts.map((part, i) => (
                    <g key={`${shape.key}-part-${i}`}>
                      <path
                        d={part.frontFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                      <path
                        d={part.topFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                      <path
                        d={part.rightFace}
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        fill={fillColor}
                      />
                    </g>
                  ))}
                </g>
              );
            } else if (shape.type === 'hexagon') {
              return (
                <g key={shape.key}>
                  <path
                    d={shape.frontFace}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    fill={fillColor}
                  />
                </g>
              );
            }
            return null;
          })}
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
