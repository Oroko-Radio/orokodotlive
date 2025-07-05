import { useState, useRef, useEffect } from "react";

const useSizeElement = () => {
  const elementRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateWidth = () => {
      setWidth(element.clientWidth);
    };

    // Initial width calculation
    updateWidth();

    // Create ResizeObserver to watch for element size changes
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });

    // Start observing the element
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { width, elementRef };
};

export default useSizeElement;
