import cn from "classnames";
import { ReactNode } from "react";

const Button = ({
  transparent = false,
  onClick,
  children,
  fixedWidth = false,
}: {
  transparent?: boolean;
  fixedWidth?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "inline-block group xl:text-xl cursor-pointer border-2 border-black rounded-full font-bold px-3 py-1.5 md:py-2 md:px-5",
        {
          "bg-transparent": transparent,
          "bg-white": !transparent,
          "w-32 md:w-40 text-center": fixedWidth,
        }
      )}
    >
      {children}
    </div>
  );
};

Button.displayName = "Button";

export default Button;
