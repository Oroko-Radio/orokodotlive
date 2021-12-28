import React from "react";
import cn from "classnames";

interface TagProps {
  text: string;
  color: "black" | "white";
  card?: boolean;
}

const Tag = ({ text, color, card = false }: TagProps) => {
  return (
    <div
      className={cn("flex-shrink-0 border-2 border-black", {
        "text-black": color === "white",
        "bg-black text-white": color === "black",
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
