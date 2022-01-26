import React from "react";
import cn from "classnames";

interface TagProps {
  text: string;
  transparent?: boolean;
  color?: "black" | "blue" | "orange" | "green" | "gray";
  card?: boolean;
}

const Tag = ({ text, transparent, color, card = false }: TagProps) => {
  return (
    <div
      className={cn("flex-shrink-0 border-2 border-black", {
        "text-black": transparent,
        "bg-black text-white": color === "black",
        "bg-black text-orokoBlue": color === "blue",
        "bg-black text-orokoOrange": color === "orange",
        "bg-black text-orokoGreen": color === "green",
        "bg-black text-orokoGray": color === "gray",
      })}
    >
      <p
        className={cn(
          "font-sans inline-block font-semibold text-sm md:text-base mb-0 px-2 py-1",
          {
            "lg:text-lg": !card,
          }
        )}
      >
        {text.toUpperCase()}
      </p>
    </div>
  );
};

export default Tag;
