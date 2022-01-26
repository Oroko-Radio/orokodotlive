import cx from "classnames";
import { ReactNode } from "react";
import CloseIcon from "../../icons/CloseIcon";

const MenuButton = ({
  children,
  isMenuOpen,
}: {
  isMenuOpen: boolean;
  children: ReactNode;
}) => {
  return (
    <div
      className={cx(
        "inline group bg-white xl:text-xl cursor-pointer border-2 border-black rounded-full font-bold px-3 py-1.5 md:py-2 md:px-5"
      )}
    >
      <div
        className={cx("relative inline-block", {
          "h-3 w-3 xl:h-4 xl:w-4 mr-2 xl:mr-3": !isMenuOpen,
          "h-4 w-4 xl:h-5 xl:w-5 mr-1 xl:mr-2": isMenuOpen,
        })}
      >
        {!isMenuOpen ? (
          <div>
            <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black w-full h-full rounded-full inline-block group-hover:h-1.5 group-hover:w-1.5 xl:group-hover:h-2 xl:group-hover:w-2 transition-all"></div>
            <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-3.5 h-3.5 xl:w-4 xl:h-4 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-5 h-5 xl:w-6 xl:h-6 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        ) : (
          <div className="mt-0.5 -translate-x-0.5">
            <CloseIcon />
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

MenuButton.displayName = "MenuButton";

export default MenuButton;
