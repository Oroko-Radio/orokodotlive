import React, { ReactNode } from "react";
import cn from "classnames";
import ShareButton from "./ui/ShareButton";
import PlayButton from "./ui/PlayButton";

export default function TitleBox({
  children,
  bgColor,
  mixcloudLink,
  title,
  slug,
}: {
  children: ReactNode;
  bgColor?: "green" | "red" | "orange" | "light-orange";
  mixcloudLink?: string;
  title: string;
  slug: string;
}) {
  return (
    <section
      className={cn("relative border-black border-b-2 md:py-6 pb-6 lg:pb-10", {
        "bg-orokoGreen": bgColor === "green",
        "bg-orokoRed": bgColor === "red",
        "bg-orokoOrange": bgColor === "orange",
        "bg-orokoLightOrange": bgColor === "light-orange",
      })}
    >
      <div
        className={cn(
          "grid auto-rows-fr md:grid-cols-1 md:absolute right-0 top-0 h-full border-b-2 md:border-b-0 md:border-l-2 border-black text-black mb-6 md:mb-0",
          {
            "grid-cols-2": mixcloudLink,
          }
        )}
      >
        <div
          className={cn(
            "border-black md:order-2 md:border-r-0 flex px-8 xl:px-16 py-2",
            {
              "bg-orokoYellow": !bgColor,
              "bg-transparent": bgColor,
              "border-r-2 justify-center": mixcloudLink,
              "justify-end md:justify-center": !mixcloudLink,
            }
          )}
        >
          <div className="self-center">
            <ShareButton details={{ title, slug }} />
          </div>
        </div>
        {mixcloudLink && (
          <div className="border-black md:order-1 bg-orokoBlue md:border-b-2 flex justify-center align-middle xl:px-16">
            <PlayButton mixcloudLink={mixcloudLink} />
          </div>
        )}
      </div>
      {children}
    </section>
  );
}
