import React from "react";
import SliderContext from "./contexts/sliderContext";
import SliderButton from "./ui/SliderButton";
import useSliding from "../hooks/useSliding";
import useSizeElement from "../hooks/useSizeElement";
import SliderCard from "./SliderCard";
import { useSwipeable } from "react-swipeable";
import cx from "classnames";

interface SliderSubComponents {
  Card?: typeof SliderCard;
}

interface SliderProps {
  children?: React.ReactNode;
  slideByElementWidth?: boolean;
  fullSize?: boolean;
}

const SliderWrapper = ({ children, fullSize }: SliderProps) => {
  return (
    <div
      className={cx("overflow-hidden relative", {
        "mb-8 xl:mb-12 ": !fullSize,
      })}
    >
      {children}
    </div>
  );
};

const Slider: React.FC<SliderProps> & SliderSubComponents = ({
  slideByElementWidth,
  fullSize,
  children,
}) => {
  const { width, elementRef } = useSizeElement();
  const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } =
    useSliding(width, React.Children.count(children), slideByElementWidth);

  const handlers = useSwipeable({
    onSwipedLeft: () => hasNext && handleNext(),
    onSwipedRight: () => hasPrev && handlePrev(),
  });

  return (
    <SliderContext.Provider value={{ elementRef }}>
      <SliderWrapper fullSize>
        <div
          {...handlers}
          className={cx("", {
            "mx-4 md:mx-8": !fullSize,
          })}
        >
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
