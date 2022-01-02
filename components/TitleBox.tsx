import React, { ReactNode } from "react";
import cn from "classnames";

export default function TitleBox({
  children,
  bgColor,
}: {
  children: ReactNode;
  bgColor?: "green" | "red" | "orange" | "light-orange";
}) {
  return (
    <section
      className={cn("relative border-black border-2 pb-6 md:py-6 lg:pb-10", {
        "bg-orokoGreen": bgColor === "green",
        "bg-orokoRed": bgColor === "red",
        "bg-orokoOrange": bgColor === "orange",
        "bg-orokoLightOrange": bgColor === "light-orange",
      })}
    >
      {children}
    </section>
  );
}
