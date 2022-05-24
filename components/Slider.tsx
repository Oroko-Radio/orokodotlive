import React from "react";
import SliderContext from "./contexts/sliderContext";
import SliderButton from "./ui/SliderButton";
import useSliding from "../hooks/useSliding";
import useSizeElement from "../hooks/useSizeElement";
import SliderCard from "./SliderCard";
import { useSwipeable } from "react-swipeable";

interface SliderSubComponents {
  Card?: typeof SliderCard;
}

const SliderWrapper = ({ children }) => {
  return (
    <div className="mb-8 xl:mb-12 overflow-hidden relative">{children}</div>
  );
};

const Slider: React.FunctionComponent & SliderSubComponents = ({
  children,
}) => {
  const { width, elementRef } = useSizeElement();
  const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } =
    useSliding(width, React.Children.count(children));

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
  });

  return (
    <SliderContext.Provider value={{ elementRef }}>
      <SliderWrapper>
        <div {...handlers} className="mx-4 md:mx-8">
          <div
            ref={containerRef}
            className="flex transition-transform"
            {...slideProps}
          >
            {children}
          </div>
        </div>
        {hasPrev && <SliderButton onClick={handlePrev} type="left" />}
        {hasNext && <SliderButton onClick={handleNext} type="right" />}
      </SliderWrapper>
    </SliderContext.Provider>
  );
};

Slider.Card = SliderCard;

export default Slider;
