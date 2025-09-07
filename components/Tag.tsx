import React from "react";
import cn from "classnames";

interface TagProps {
  text: string;
  transparent?: boolean;
  color?:
    | "black"
    | "blue"
    | "orange"
    | "green"
    | "gray"
    | "yellow"
    | "white"
    | "selected";
  borderColor?: "black" | "white";
  card?: boolean;
}

const Tag = ({
  text,
  transparent,
  color,
  borderColor = "black",
  card = false,
}: TagProps) => {
  return (
    <div
      className={cn("flex-shrink-0 border-2", {
        "text-black": transparent,
        "bg-white text-black": color === "selected",
        "bg-black text-white": color === "black",
        "bg-black text-orokoBlue": color === "blue",
        "bg-black text-orokoOrange": color === "orange",
        "bg-black text-orokoGreen": color === "green",
        "bg-black text-orokoGray": color === "gray",
        "bg-black text-orokoYellow": color === "yellow",
        "text-white": color === "white",
        "border-black": borderColor === "black",
        "border-white": borderColor === "white",
      })}
    >
      <p
        className={cn(
          "font-sans inline-block font-semibold text-sm md:text-base mb-0 px-2 py-1 uppercase",
          {
            "lg:text-lg": !card,
          },
        )}
      >
        {text}
      </p>
    </div>
  );
};

export default Tag;
