import cn from "classnames";
import { ReactNode } from "react";

const Button = ({
  transparent = false,
  onClick,
  fixedWidth = false,
  disabled = false,
  white = false,
  size = "md",
  children,
}: {
  transparent?: boolean;
  onClick?: () => void;
  fixedWidth?: boolean;
  disabled?: boolean;
  white?: boolean;
  size?: "sm" | "md";
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-block group xl:text-xl cursor-pointer rounded-full font-bold",
        {
          "bg-transparent": transparent,
          "border-black": !white,
          "border-white text-white": white,
          "px-3 py-1.5 md:py-2 md:px-5 border-2": size === "md",
          "px-3 py-1.5 md:px-4 border-2": size === "sm",
          "bg-white": !transparent,
          "w-32 md:w-44 text-center": fixedWidth,
          "text-gray-400": disabled,
        }
      )}
    >
      {children}
    </button>
  );
};

Button.displayName = "Button";

export default Button;
