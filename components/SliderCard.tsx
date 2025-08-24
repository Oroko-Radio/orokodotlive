"use client";

import React from "react";
import cn from "classnames";
import SliderContext from "@/components/contexts/sliderContext";
import Card from "./Card";
import { CardProps } from "@/types/shared";

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
    {(context) => {
      if (!context) return null;
      const { elementRef } = context;
      return (
        <div
          ref={elementRef}
          className={cn(`inline-block flex-shrink-0`, {
            "border-l-0": idx !== 0,
            "card-half": cardWidth === "half",
            "card-third": cardWidth === "third",
            "card-quarter": cardWidth === "quarter",
            "bg-orokoGray": bgColor === "gray",
            "card-featured": cardWidth === "featured",
            "border-2 border-black cursor-pointer": cardWidth !== "featured",
          })}
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
