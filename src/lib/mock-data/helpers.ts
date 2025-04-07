import React from 'react';

/**
 * Creates a serializable icon data object that can be used in mock data
 * This avoids using JSX in non-TSX files which causes build errors
 */
export const createIconData = (
  Icon: any, 
  color: string = 'muted-foreground', 
  size: 'xs' | 'sm' | 'md' | 'lg' = 'md'
) => {
  const sizeMap = {
    xs: '3',
    sm: '4',
    md: '5',
    lg: '12'
  };
  
  return {
    type: Icon.name,
    props: {
      className: `h-${sizeMap[size]} w-${sizeMap[size]} text-${color}`
    }
  };
};
