import cx from "classnames";
import Link from "next/link";
import useHover from "../hooks/useHover";
import Button from "./ui/Button";

export default function PatreonBanner() {
  const [element, isHover] = useHover<HTMLDivElement>();

  return (
    <div
      ref={element}
      className={cx(
        "relative flex overflow-hidden justify-center h-20 xl:h-24 border-b-2 border-black",
        {
          "bg-orokoLightOrange": isHover,
          "bg-orokoGreen": !isHover,
        }
      )}
    >
      <div className="self-center z-10">
        <Link href="https://www.patreon.com/orokoradio" passHref>
          <a target="_blank">
            <Button>{isHover ? "On Patreon" : "Support Us!"}</Button>
          </a>
        </Link>
      </div>
      <div
        className={cx(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orokoOrange transition-all ease-out duration-1000",
          {
            "h-0 w-0": !isHover,
            "h-96 w-96 xl:h-[48rem] xl:w-[48rem]": isHover,
          }
        )}
      ></div>
      <div
        className={cx(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orokoRed transition-all ease-out duration-1000",
          {
            "h-0 w-0": !isHover,
            "h-48 w-48 xl:h-96 xl:w-96": isHover,
          }
        )}
      ></div>
    </div>
  );
}
