import React, { ReactNode } from "react";
import cn from "classnames";

export default function TitleBox({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor?: "green";
}) {
  return (
    <section
      className={cn(
        "relative border-black border-2 mb-6 pb-6 md:py-6 lg:pb-10",
        {
          "bg-orokoGreen": bgColor === "green",
        }
      )}
    >
      {children}
    </section>
  );
}
