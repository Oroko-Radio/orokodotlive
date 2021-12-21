import React from "react";
import SliderContext from "./contexts/sliderContext";
import SliderButton from "./SliderButton";
import SliderWrapper from "./SliderWrapper";
import useSliding from "../hooks/useSliding";
import useSizeElement from "../hooks/useSizeElement";
import SliderCard from "./SliderCard";

interface SliderSubComponents {
  Card?: typeof SliderCard;
}

const Slider: React.FunctionComponent & SliderSubComponents = ({
  children,
}) => {
  const { width, elementRef } = useSizeElement();
  const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } =
    useSliding(width, React.Children.count(children));

  return (
    <SliderContext.Provider value={{ elementRef }}>
      <SliderWrapper>
        <div>
          <div
            ref={containerRef}
            className="flex ml-8 transition-transform"
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
