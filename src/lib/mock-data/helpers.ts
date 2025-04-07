import { IconData } from './types';

/**
 * Size mapping for icon dimensions
 */
const sizeMap = {
  xs: '3',
  sm: '4',
  md: '5',
  lg: '12'
};

/**
 * Creates a serializable icon data object that can be used in mock data
 * This avoids using JSX in non-TSX files which causes build errors
 * 
 * @param Icon - The Lucide icon component
 * @param color - The color class to apply (without the 'text-' prefix)
 * @param size - The size of the icon (xs, sm, md, lg)
 * @returns A serializable icon data object
 */
export const createIconData = (
  Icon: any, 
  color: string = 'muted-foreground', 
  size: keyof typeof sizeMap = 'md'
): IconData => {
  return {
    type: Icon.name,
    props: {
      className: `h-${sizeMap[size]} w-${sizeMap[size]} text-${color}`
    }
  };
};
