import React from "react";
import cn from "classnames";
import SliderContext from "./contexts/sliderContext";
import Card from "./Card";

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  idx?: number;
  children?: any;
}

const SliderCard = ({ imageUrl, title, link, idx, children }: CardProps) => (
  <SliderContext.Consumer>
    {({ elementRef }) => {
      return (
        <div
          ref={elementRef}
          className={cn(
            "inline-block flex-shrink-0 card bg-orokoGray cursor-pointer border-2 border-black",
            {
              "border-l-0": idx !== 0,
            }
          )}
        >
          <Card imageUrl={imageUrl} title={title} link={link}>
            {children}
          </Card>
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default SliderCard;
