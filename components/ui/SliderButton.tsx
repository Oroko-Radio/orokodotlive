'use client';

import React from "react";
import cn from "classnames";
import Image from "next/legacy/image";
import chevronRight from "@/images/ui/chevron-right.svg";
import chevronLeft from "@/images/ui/chevron-left.svg";

const SliderButton = ({
  onClick,
  type,
}: {
  onClick: () => void;
  type: "left" | "right";
}) => (
  <button
    onClick={onClick}
    className={cn(
      `group absolute cursor-pointer bg-offBlack opacity-70 md:opacity-100 z-20 top-1/2 -translate-y-1/2 rounded-full h-16 w-16 border-black border-2 flex justify-center items-center transition-transform`,
      {
        "left-2 md:left-4 md:hover:-translate-x-2": type === "left",
        "right-2 md:right-4 md:hover:translate-x-2": type === "right",
      }
    )}
  >
    <div
      className={cn(
        "relative h-full w-full m-4 group-hover:scale-110 transition-transform",
        {
          "ml-3": type === "left",
          "mr-3": type === "right",
        }
      )}
    >
      <Image
        src={type === "right" ? chevronRight : chevronLeft}
        alt="Arrow right"
        layout="fill"
      />
    </div>
  </button>
);

export default SliderButton;
