import React, { useMemo, useEffect, useState, memo, useRef } from 'react';

// Import shape generators in proper order
import { createBox } from './generated-bg/box';
import { createLShape } from './generated-bg/l-shape';
import { createUShape } from './generated-bg/u-shape';
import { createCShape } from './generated-bg/c-shape';
import { createTShape } from './generated-bg/t-shape';
import { createPlatform } from './generated-bg/platform';
import { createSteppedShape } from './generated-bg/stepped';
import { createZigzag } from './generated-bg/zigzag';
import { createHexagon } from './generated-bg/hexagon';
import { createSacredGeometry } from './generated-bg/sacred';
import { createPyramid } from './generated-bg/pyramid';

export type Shape =
  | {
      type: 'box';
      key: string;
      frontFace: string;
      topFace: string;
      rightFace: string;
    }
  | {
      type: 'l-shape';
      key: string;
      frontFace: string;
      topFace: string;
      rightFace: string;
      armFrontFace: string;
      armTopFace: string;
      armRightFace: string;
    }
  | {
      type: 'u-shape';
      key: string;
      leftFrontFace: string;
      leftTopFace: string;
      leftRightFace: string;
      rightFrontFace: string;
      rightTopFace: string;
      rightRightFace: string;
      bottomFrontFace: string;
      bottomTopFace: string;
      bottomRightFace: string;
    }
  | {
      type: 'c-shape';
      key: string;
      topFrontFace: string;
      topTopFace: string;
      topRightFace: string;
      leftFrontFace: string;
      leftTopFace: string;
      leftRightFace: string;
      bottomFrontFace: string;
      bottomTopFace: string;
      bottomRightFace: string;
    }
  | {
      type: 't-shape';
      key: string;
      verticalFrontFace: string;
      verticalTopFace: string;
      verticalRightFace: string;
      horizontalFrontFace: string;
      horizontalTopFace: string;
      horizontalRightFace: string;
    }
  | {
      type: 'platform';
      key: string;
      frontFace: string;
      topFace: string;
      rightFace: string;
    }
  | {
      type: 'stepped';
      key: string;
      steps: Array<{ frontFace: string; topFace: string; rightFace: string }>;
    }
  | {
      type: 'zigzag';
      key: string;
      parts: Array<{ frontFace: string; topFace: string; rightFace: string }>;
    }
  | { type: 'hexagon'; key: string; frontFace: string }
  | { type: 'sacred'; key: string; pattern: string }
  | {
      type: 'pyramid';
      key: string;
      frontFace: string;
      rightFace: string;
      leftFace: string;
      backFace: string;
      baseFace: string;
    };

interface BackgroundComponentProps {
  children: React.ReactNode;
  shapeCount?: number;
  strokeColor?: string;
  strokeWidth?: number;
  fillColor?: string;
  seed?: number;
  distribution?: 'edges' | 'corners' | 'scattered' | 'even';
}

// Create a base component that can be memoized
const BackgroundComponentBase: React.FC<BackgroundComponentProps> = ({
  children,
  shapeCount = 22,
  strokeColor = '#E0E0E0',
  strokeWidth = 1.2,
  fillColor = 'white',
  seed: propSeed,
  distribution = 'scattered'
}): JSX.Element => {
  // Use a stable seed value that doesn't change on re-renders
  const seedRef = useRef<number>(propSeed ?? Date.now());
  // If propSeed is provided, use it, otherwise use our stable ref value
  const seed = propSeed ?? seedRef.current;
  // Helper functions for randomization with seed
  const createRandomGenerator = (seed: number): (() => number) => {
    let s = seed;
    return () => {
      s = (s * 16807) % 2147483647;
      return s / 2147483647;
    };
  };

  const random = createRandomGenerator(seed);

  // Generate random number in range
  const randomRange = (min: number, max: number): number =>
    min + random() * (max - min);

  // Generate integer in range (inclusive)
  const randomInt = (min: number, max: number): number =>
    Math.floor(randomRange(min, max + 0.999));

  // Generate shapes for the background
  const generatedShapes = useMemo(() => {
    const shapes: Shape[] = [];
    const viewWidth = 1200;
    const viewHeight = 800;

    // Array to hold placed bounding boxes for collision detection
    const placedBoxes: Array<{ x: number; y: number; w: number; h: number }> =
      [];
    let lastShapeType = -1;

    // Helper function to check overlap between two boxes with minimum spacing
    const doesOverlap = (
      box: { x: number; y: number; w: number; h: number },
      boxes: Array<{ x: number; y: number; w: number; h: number }>,
      minSpacing: number = 10
    ): boolean => {
      return boxes.some(
        (b) => {
          // Expand the bounding box by minSpacing in all directions
          const expandedBox = {
            x: box.x - minSpacing,
            y: box.y - minSpacing,
            w: box.w + 2 * minSpacing,
            h: box.h + 2 * minSpacing
          };
          
          // Check if the expanded box overlaps with any existing box
          return (
            expandedBox.x < b.x + b.w &&
            expandedBox.x + expandedBox.w > b.x &&
            expandedBox.y < b.y + b.h &&
            expandedBox.y + expandedBox.h > b.y
          );
        }
      );
    };

    // Get a position based on the distribution preference
    const getPositionCandidate = (
      w: number,
      h: number
    ): { x: number; y: number; w: number; h: number } | null => {
      let attempts = 0;
      const buffer = 40; // Increased minimum distance between shapes
      const centerAvoidance = 200; // Size of center area to avoid
      const viewCenterX = viewWidth / 2;
      const viewCenterY = viewHeight / 2;
      
      // Calculate the safety margin to keep shapes from the edges
      const edgeMargin = 30;
      const tableBase = viewHeight - 50;

      while (attempts < 150) { // Increased attempts for better positioning
        let x, y;

        switch (distribution) {
          case 'edges':
            // Distribute along the edges, keeping away from center
            const edgeChoice = random();
            if (edgeChoice < 0.25) {
              // Left edge
              x = randomRange(edgeMargin, 250 - w - edgeMargin);
              y = randomRange(edgeMargin, viewHeight - h - edgeMargin);
            } else if (edgeChoice < 0.5) {
              // Right edge
              x = randomRange(viewWidth - 250 + edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(edgeMargin, viewHeight - h - edgeMargin);
            } else if (edgeChoice < 0.75) {
              // Top edge
              x = randomRange(edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(edgeMargin, 200 - h - edgeMargin);
            } else {
              // Bottom edge
              x = randomRange(edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(viewHeight - 200 + edgeMargin, viewHeight - h - edgeMargin);
            }
            break;

          case 'corners':
            // Focus shapes in the corners, away from center
            const cornerChoice = randomInt(0, 3);
            if (cornerChoice === 0) {
              // Top-left
              x = randomRange(edgeMargin, 300 - w - edgeMargin);
              y = randomRange(edgeMargin, 250 - h - edgeMargin);
            } else if (cornerChoice === 1) {
              // Top-right
              x = randomRange(viewWidth - 300 + edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(edgeMargin, 250 - h - edgeMargin);
            } else if (cornerChoice === 2) {
              // Bottom-left
              x = randomRange(edgeMargin, 300 - w - edgeMargin);
              y = randomRange(viewHeight - 250 + edgeMargin, viewHeight - h - edgeMargin);
            } else {
              // Bottom-right
              x = randomRange(viewWidth - 300 + edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(viewHeight - 250 + edgeMargin, viewHeight - h - edgeMargin);
            }
            break;

          case 'scattered':
            // Random distribution but avoid center area
            // First determine if we're placing in one of four quadrants
            const quadrant = randomInt(0, 3);
            if (quadrant === 0) {
              // Top-left quadrant
              x = randomRange(edgeMargin, viewCenterX - centerAvoidance/2 - edgeMargin);
              y = randomRange(edgeMargin, viewCenterY - centerAvoidance/2 - edgeMargin);
            } else if (quadrant === 1) {
              // Top-right quadrant
              x = randomRange(viewCenterX + centerAvoidance/2 + edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(edgeMargin, viewCenterY - centerAvoidance/2 - edgeMargin);
            } else if (quadrant === 2) {
              // Bottom-left quadrant
              x = randomRange(edgeMargin, viewCenterX - centerAvoidance/2 - edgeMargin);
              y = randomRange(viewCenterY + centerAvoidance/2 + edgeMargin, viewHeight - h - edgeMargin);
            } else {
              // Bottom-right quadrant
              x = randomRange(viewCenterX + centerAvoidance/2 + edgeMargin, viewWidth - w - edgeMargin);
              y = randomRange(viewCenterY + centerAvoidance/2 + edgeMargin, viewHeight - h - edgeMargin);
            }
            break;

          case 'even':
            // More even distribution while avoiding center
            const gridCols = 8; // Increased grid density
            const gridRows = 6;
            const cellWidth = viewWidth / gridCols;
            const cellHeight = viewHeight / gridRows;

            // Pick a random cell but avoid the center cells
            let col, row;
            do {
              col = randomInt(0, gridCols - 1);
              row = randomInt(0, gridRows - 1);
              // Skip center cells
            } while (
              (col >= gridCols/2 - 1 && col <= gridCols/2) && 
              (row >= gridRows/2 - 1 && row <= gridRows/2)
            );

            // Get position within that cell with some jitter
            x = col * cellWidth + randomRange(edgeMargin, cellWidth - w - edgeMargin);
            y = row * cellHeight + randomRange(edgeMargin, cellHeight - h - edgeMargin);
            break;

          default:
            // Fallback to edges, avoiding center
            if (random() < 0.5) {
              // Left or right edge
              x = random() < 0.5 
                ? randomRange(edgeMargin, viewCenterX - centerAvoidance - w)
                : randomRange(viewCenterX + centerAvoidance, viewWidth - w - edgeMargin);
              y = randomRange(edgeMargin, viewHeight - h - edgeMargin);
            } else {
              // Top or bottom edge
              x = randomRange(edgeMargin, viewWidth - w - edgeMargin);
              y = random() < 0.5
                ? randomRange(edgeMargin, viewCenterY - centerAvoidance - h)
                : randomRange(viewCenterY + centerAvoidance, viewHeight - h - edgeMargin);
            }
        }

        const candidate = { x, y: tableBase - h, w, h };
        
        // Enhanced collision detection with minimum spacing
        if (!doesOverlap(candidate, placedBoxes, buffer)) {
          return candidate;
        }
        attempts++;
      }
      return null;
    };

    // Number of each shape type
    const totalShapeTypes = 11; // Including pyramid

    // Attempt to create a balanced distribution of shapes
    const targetShapesPerType = Math.max(
      1,
      Math.floor(shapeCount / totalShapeTypes)
    );
    const shapeTypeCounts = Array(totalShapeTypes).fill(0);

    for (let i = 0; i < shapeCount; i++) {
      // Reduced size ranges for better spacing
      const width = randomRange(40, 90);
      const height = randomRange(40, 90);
      const depth = randomRange(15, 35);
      const armWidth = randomRange(15, 30);

      const candidate = getPositionCandidate(width, height);
      if (!candidate) continue; // Skip if no non-overlapping position found

      placedBoxes.push(candidate);
      const { x, y } = candidate;

      // Pick shape type, ensuring we don't repeat the last one and we maintain a good distribution
      let shapeType;

      // First try to pick an underrepresented shape type
      const underrepresentedTypes = Array(totalShapeTypes)
        .fill(0)
        .map((_, index) => index)
        .filter((type) => shapeTypeCounts[type] < targetShapesPerType)
        .filter((type) => type !== lastShapeType);

      if (underrepresentedTypes.length > 0) {
        // Randomly select from underrepresented types
        const typeIndex = randomInt(0, underrepresentedTypes.length - 1);
        shapeType = underrepresentedTypes[typeIndex];
      } else {
        // If all types have met their quota, just pick randomly but avoid repeating
        do {
          shapeType = randomInt(0, totalShapeTypes - 1);
        } while (shapeType === lastShapeType);
      }

      lastShapeType = shapeType;
      shapeTypeCounts[shapeType]++;

      let shape;
      const key = `shape-${i}`;

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
        case 8: // Hexagon
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
        case 9: // Sacred geometry
          shape = createSacredGeometry(x, y, width, height);
          shapes.push({
            type: 'sacred',
            key,
            pattern: shape.pattern
          });
          break;
        case 10: // Pyramid
          shape = createPyramid(x, y, width, height, depth);
          shapes.push({
            type: 'pyramid',
            key,
            ...shape
          });
          break;
      }
    }

    return shapes;
  }, [shapeCount, seed, distribution]);

  // Use useState instead of separate React imports
  const [mounted, setMounted] = useState(false);

  // Mount SVG only after client-side render to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize the path attributes for consistent styling
  const pathStyle = useMemo(
    () => ({
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      fill: fillColor,
      strokeLinejoin: 'round' as const,
      strokeLinecap: 'round' as const
    }),
    [strokeColor, strokeWidth, fillColor]
  );

  // Special style for sacred geometry
  const sacredStyle = useMemo(
    () => ({
      ...pathStyle,
      fill: 'none',
      strokeDasharray: '3 2'
    }),
    [pathStyle]
  );

  // Memoize the render function for better performance
  const renderShape = useMemo(() => {
    // Return a function that renders a shape based on its type
    return (shape: Shape): JSX.Element | null => {
      switch (shape.type) {
        case 'box':
          return (
            <g key={shape.key}>
              <path d={shape.frontFace} {...pathStyle} />
              <path d={shape.topFace} {...pathStyle} />
              <path d={shape.rightFace} {...pathStyle} />
            </g>
          );
        case 'l-shape':
          return (
            <g key={shape.key}>
              <path d={shape.frontFace} {...pathStyle} />
              <path d={shape.topFace} {...pathStyle} />
              <path d={shape.rightFace} {...pathStyle} />
              <path d={shape.armFrontFace} {...pathStyle} />
              <path d={shape.armTopFace} {...pathStyle} />
              <path d={shape.armRightFace} {...pathStyle} />
            </g>
          );
        case 'u-shape':
          return (
            <g key={shape.key}>
              <path d={shape.leftFrontFace} {...pathStyle} />
              <path d={shape.leftTopFace} {...pathStyle} />
              <path d={shape.leftRightFace} {...pathStyle} />
              <path d={shape.rightFrontFace} {...pathStyle} />
              <path d={shape.rightTopFace} {...pathStyle} />
              <path d={shape.rightRightFace} {...pathStyle} />
              <path d={shape.bottomFrontFace} {...pathStyle} />
              <path d={shape.bottomTopFace} {...pathStyle} />
              <path d={shape.bottomRightFace} {...pathStyle} />
            </g>
          );
        case 'c-shape':
          return (
            <g key={shape.key}>
              <path d={shape.topFrontFace} {...pathStyle} />
              <path d={shape.topTopFace} {...pathStyle} />
              <path d={shape.topRightFace} {...pathStyle} />
              <path d={shape.leftFrontFace} {...pathStyle} />
              <path d={shape.leftTopFace} {...pathStyle} />
              <path d={shape.leftRightFace} {...pathStyle} />
              <path d={shape.bottomFrontFace} {...pathStyle} />
              <path d={shape.bottomTopFace} {...pathStyle} />
              <path d={shape.bottomRightFace} {...pathStyle} />
            </g>
          );
        case 't-shape':
          return (
            <g key={shape.key}>
              <path d={shape.verticalFrontFace} {...pathStyle} />
              <path d={shape.verticalTopFace} {...pathStyle} />
              <path d={shape.verticalRightFace} {...pathStyle} />
              <path d={shape.horizontalFrontFace} {...pathStyle} />
              <path d={shape.horizontalTopFace} {...pathStyle} />
              <path d={shape.horizontalRightFace} {...pathStyle} />
            </g>
          );
        case 'platform':
          return (
            <g key={shape.key}>
              <path d={shape.frontFace} {...pathStyle} />
              <path d={shape.topFace} {...pathStyle} />
              <path d={shape.rightFace} {...pathStyle} />
            </g>
          );
        case 'stepped':
          return (
            <g key={shape.key}>
              {shape.steps.map((step, i) => (
                <g key={`${shape.key}-step-${i}`}>
                  <path d={step.frontFace} {...pathStyle} />
                  <path d={step.topFace} {...pathStyle} />
                  <path d={step.rightFace} {...pathStyle} />
                </g>
              ))}
            </g>
          );
        case 'zigzag':
          return (
            <g key={shape.key}>
              {shape.parts.map((part, i) => (
                <g key={`${shape.key}-part-${i}`}>
                  <path d={part.frontFace} {...pathStyle} />
                  <path d={part.topFace} {...pathStyle} />
                  <path d={part.rightFace} {...pathStyle} />
                </g>
              ))}
            </g>
          );
        case 'hexagon':
          return (
            <g key={shape.key}>
              <path d={shape.frontFace} {...pathStyle} />
            </g>
          );
        case 'sacred':
          return (
            <g key={shape.key}>
              <path d={shape.pattern} {...sacredStyle} />
            </g>
          );
        case 'pyramid':
          return (
            <g key={shape.key}>
              <path d={shape.frontFace} {...pathStyle} />
              <path d={shape.rightFace} {...pathStyle} />
              <path d={shape.leftFace} {...pathStyle} />
              <path d={shape.backFace} {...pathStyle} />
            </g>
          );
        default:
          return null;
      }
    };
  }, [pathStyle, sacredStyle]);

  // Pre-render all shapes once
  const renderedShapes = useMemo(() => {
    return generatedShapes.map(renderShape);
  }, [generatedShapes, renderShape]);

  // Memoize the SVG content to prevent unnecessary re-renders
  const backgroundSvg = useMemo(() => {
    if (!mounted) return null;

    return (
      <svg
        className="absolute top-0 left-0 w-full h-full opacity-80"
        viewBox="0 0 1200 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Subtle gradient overlay */}
        <defs>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.05" />
          </filter>
        </defs>

        {/* Plain white background */}
        <rect width="1200" height="800" fill="#FFFFFF" />

        {/* Group for all shapes with subtle shadow */}
        <g filter="url(#shadow)">{renderedShapes}</g>
      </svg>
    );
  }, [mounted, renderedShapes]);

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden bg-white">
      {/* Background layer with isometric 3D shapes */}
      <div
        suppressHydrationWarning
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        {backgroundSvg}
      </div>

      {/* Content layer that must remain interactive */}
      <div className="absolute inset-0 w-full h-full z-10">
        {children}
      </div>
    </div>
  );
};

// Memoize the component but don't block children updates
// We still want the children to update and be interactive
const BackgroundComponent = memo(BackgroundComponentBase);

export default BackgroundComponent;
