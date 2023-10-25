import { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import cx from "classnames";
import Meta from "../components/Meta";
import Button from "../components/ui/Button";

export default function ThumbnailGenerator() {
  const thumbnail = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState<string>("");
  const [format, setFormat] = useState<"square" | "portrait">("square");

  function download() {
    domtoimage
      .toJpeg(thumbnail.current, {
        style: {
          transform: "scale(1)",
        },
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.jpeg";
        link.href = dataUrl;
        link.click();
      });
  }

  return (
    <>
      <Meta title="Thumbnail Generator" />
      <div className="grid md:grid-cols-[1fr,3fr]">
        <div>
          <form>
            <input
              className="border-black border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <fieldset>
              <label htmlFor="square">Square</label>
              <input
                type="radio"
                id="square"
                onChange={(e) => {
                  if (e.target.value === "on") {
                    setFormat("square");
                  }
                }}
                checked={format === "square"}
              />
              <label htmlFor="portrait">Portrait</label>
              <input
                type="radio"
                id="portrait"
                onChange={(e) => {
                  if (e.target.value === "on") {
                    setFormat("portrait");
                  }
                }}
                checked={format === "portrait"}
              />
            </fieldset>
            <Button onClick={download}>Download Jpeg</Button>
          </form>
        </div>
        <div className="grid justify-center bg-black p-8">
          <div
            ref={thumbnail}
            className={cx("bg-white scale-50", {
              "h-[1080px] w-[1080px]": format === "square",
              "h-[1920px] w-[1080px]": format === "portrait",
            })}
          >
            <h2 className="text-2xl">{title}</h2>
            <p>{format}</p>
          </div>
        </div>
      </div>
    </>
  );
}
