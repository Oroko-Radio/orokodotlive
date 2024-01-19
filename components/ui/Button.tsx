import cn from "classnames";
import { ReactNode } from "react";

const Button = ({
  transparent = false,
  onClick,
  fixedWidth = false,
  disabled = false,
  children,
}: {
  transparent?: boolean;
  onClick?: () => void;
  fixedWidth?: boolean;
  disabled?: boolean;
  children: ReactNode;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-block group xl:text-xl cursor-pointer border-2 border-black rounded-full font-bold px-3 py-1.5 md:py-2 md:px-5",
        {
          "bg-transparent": transparent,
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
