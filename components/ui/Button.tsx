import cn from "classnames";
import { ReactNode } from "react";

const Button = ({
  transparent = false,
  onClick,
  children,
}: {
  transparent?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        "inline group xl:text-xl cursor-pointer border-2 border-black rounded-full font-bold px-3 py-1.5 md:py-2 md:px-5",
        {
          "bg-transparent": transparent,
          "bg-white": !transparent,
        }
      )}
    >
      {children}
    </div>
  );
};

Button.displayName = "Button";

export default Button;
