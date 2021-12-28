import React from "react";
import cn from "classnames";

interface TagProps {
  text: string;
  color: "black" | "white";
}

const Tag = ({ text, color }: TagProps) => {
  return (
    <div
      className={cn("flex-shrink-0 border-2 border-black", {
        "text-black": color === "white",
        "bg-black text-white": color === "black",
      })}
    >
      <p className="font-sans inline-block font-semibold text-sm lg:text-lg mb-0 px-2 py-1">
        {text.toUpperCase()}
      </p>
    </div>
  );
};

export default Tag;
