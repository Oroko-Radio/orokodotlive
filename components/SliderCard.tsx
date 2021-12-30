import React from "react";
import cn from "classnames";
import SliderContext from "./contexts/sliderContext";
import Card from "./Card";
import PlayButton from "./ui/PlayButton";

interface CardProps {
  imageUrl: string;
  title: string;
  link: string;
  idx?: number;
  children?: any;
  cardWidth?: "half" | "quarter";
  playButton?: boolean;
  mixcloudLink: string;
}

const SliderCard = ({
  imageUrl,
  title,
  link,
  idx,
  children,
  cardWidth = "half",
  mixcloudLink,
}: CardProps) => (
  <SliderContext.Consumer>
    {({ elementRef }) => {
      return (
        <div
          ref={elementRef}
          className={cn(
            `inline-block flex-shrink-0 bg-orokoGray cursor-pointer border-2 border-black`,
            {
              "border-l-0": idx !== 0,
              "card-half": cardWidth === "half",
              "card-quarter": cardWidth === "quarter",
            }
          )}
        >
          <Card
            mixcloudLink={mixcloudLink}
            imageUrl={imageUrl}
            title={title}
            link={link}
          >
            {children}
          </Card>
        </div>
      );
    }}
  </SliderContext.Consumer>
);

export default SliderCard;
