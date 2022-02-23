import React, { useLayoutEffect, useState } from 'react';

export const useHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);
  
  useLayoutEffect(() => {
    const updateSize = () => {
      setHeight(window.innerHeight);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    }
  }, [])
  return height;
};

export const useWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  
  useLayoutEffect(() => {
    const updateSize = () => {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    }
  }, [])
  return width;
};