import React from "react";
import cn from "classnames";
import SliderContext from "./contexts/sliderContext";
import Card from "./Card";
import { CardProps } from "../types/shared";

const SliderCard = ({
  imageUrl,
  title,
  link,
  idx,
  children,
  cardWidth = "half",
  mixcloudLink,
  bgColor,
}: CardProps) => (
  <SliderContext.Consumer>
    {({ elementRef }) => {
      return (
        <div
          ref={elementRef}
          className={cn(
            `inline-block flex-shrink-0 cursor-pointer border-2 border-black`,
            {
              "border-l-0": idx !== 0,
              "card-half": cardWidth === "half",
              "card-quarter": cardWidth === "quarter",
              "bg-orokoGray": bgColor === "gray",
              "card-featured": cardWidth === "featured",
            }
          )}
        >
          <Card
            mixcloudLink={mixcloudLink}
            imageUrl={imageUrl}
            title={title}
            link={link}
            cardWidth={cardWidth}
          >
            {children}
          </Card>
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default SliderCard;
