import { useState, useRef, useEffect } from "react";

const PADDINGS = 0;

const useSliding = (
  elementWidth: number,
  countElements: number,
  slideByElementWidth = false
) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [distance, setDistance] = useState(0);
  const [totalInViewport, setTotalInViewport] = useState(0);
  const [viewed, setViewed] = useState(0);

  useEffect(() => {
    const containerWidth = containerRef.current.clientWidth - PADDINGS;

    setContainerWidth(containerWidth);
    setTotalInViewport(Math.floor(containerWidth / elementWidth));
    
    // Reset position when width changes (window resize)
    setDistance(0);
    setViewed(0);
  }, [containerRef, elementWidth]);

  const handlePrev = () => {
    if (slideByElementWidth) {
      setDistance(distance + elementWidth);
      setViewed(viewed - 1);
      return;
    }
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  };

  const handleNext = () => {
    if (slideByElementWidth) {
      setDistance(distance - elementWidth);
      setViewed(viewed + 1);
      return;
    }
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
  };

  const slideProps = {
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSliding;
