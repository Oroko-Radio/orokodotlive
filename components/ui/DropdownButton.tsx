import React from "react";
import cn from "classnames";
import Image from "next/image";
import chevronUp from "../../images/ui/chevron-up.svg";
import chevronDown from "../../images/ui/chevron-down.svg";

const DropdownButton = ({
  onClick,
  dropdownOpen,
}: {
  onClick: () => void;
  dropdownOpen: boolean;
}) => (
  <button
    onClick={onClick}
    className={cn(
      `group hover:scale-110 cursor-pointer bg-offBlack rounded-full h-16 w-16 border-black border-2 flex justify-center items-center transition-transform`
    )}
  >
    <div
      className={cn(
        "relative h-full w-full m-4 group-hover:scale-110 transition-transform",
        {
          "group-hover:translate-y-0.5": !dropdownOpen,
          "mb-5": dropdownOpen,
        }
      )}
    >
      <Image
        src={dropdownOpen ? chevronUp : chevronDown}
        alt="Open/Close player dropdown"
        layout="fill"
      />
    </div>
  </button>
);

export default DropdownButton;
