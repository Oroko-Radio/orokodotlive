import cn from "classnames";
import { ReactNode } from "react";

const DotButton = ({
  size = "small",
  transparent = false,
  children,
}: {
  size?: "small" | "large";
  transparent?: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cn(
        "inline group xl:text-lg cursor-pointer border-2 border-black rounded-full font-bold px-3 py-1",
        {
          "py-1.5": size === "large",
          "bg-transparent": transparent,
          "bg-white": !transparent,
        }
      )}
    >
      <div className="relative h-3 w-3 inline-block mr-2">
        <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black w-full h-full rounded-full inline-block group-hover:h-1.5 group-hover:w-1.5 transition-all"></div>
        <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      {children}
    </div>
  );
};

DotButton.displayName = "DotButton";

export default DotButton;
