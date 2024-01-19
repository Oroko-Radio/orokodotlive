import { useEffect, useRef, useState } from "react";
import cx from "classnames";
import Meta from "../components/Meta";
import Button from "../components/ui/Button";
import NextImage from "next/image";
import dayjs from "dayjs";
import ColorLogo from "../icons/ColorLogo";
import { download, getMeta } from "../util";

export default function ThumbnailGenerator() {
  const thumbnail = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [durationHr, setDurationHr] = useState<number>(1);
  const [durationMin, setDurationMin] = useState<number>(0);
  const [aspectRatio, setAspectRatio] = useState<"square" | "portrait">(
    "square"
  );
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>("");
  const [bgHeight, setBgHeight] = useState<number>(0);
  const [bgWidth, setBgWidth] = useState<number>(0);
  const [zoom, setZoom] = useState<string>("100");
  const [color, setColor] = useState<"black" | "white">("black");

  useEffect(() => {
    async function setBgSize() {
      if (!bgPreview) return;
      const img = await getMeta(bgPreview);
      setBgHeight(img.naturalHeight);
      setBgWidth(img.naturalWidth);
    }

    setBgSize();
  }, [bgPreview]);

  useEffect(() => {
    if (!bgFile) {
      setBgPreview(null);
      return;
    }

    const imageUrl = URL.createObjectURL(bgFile);
    setBgPreview(imageUrl);
    return () => URL.revokeObjectURL(imageUrl);
  }, [bgFile]);

  useEffect(() => {
    if (imageRef.current) {
      imageRef.current.style.height = zoom + "%";
    }
  }, [zoom]);

  return (
    <>
      <Meta title="Artwork Generator" noIndex />
      <div className="grid md:grid-cols-[1fr,3fr] max-w-full overflow-hidden">
        {/* Editor */}

        <div className="bg-offBlack text-white grid">
          <form className="p-4">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              className="text-black border-black border px-4 py-2 mb-4 w-80 block"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="date-time" className="block">
              Date and time
            </label>
            <input
              className="mb-4 text-black w-80"
              id="date-time"
              type="datetime-local"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setDateTime(date);
              }}
            />

            <label htmlFor="durationHr" className="block">
              Duration
            </label>
            <input
              id="durationHr"
              className="text-black border-black border w-18 mb-4"
              type="number"
              value={durationHr}
              onChange={(e) => setDurationHr(Number(e.target.value))}
              min={0}
              max={12}
            />
            <span className="ml-2 mr-4">Hr</span>

            <input
              id="durationMin"
              className="text-black border-black border w-18 mb-4"
              type="number"
              value={durationMin}
              onChange={(e) => setDurationMin(Number(e.target.value))}
              step={5}
              min={0}
              max={55}
            />
            <span className="ml-2">Mins</span>

            <fieldset className="mb-4">
              <legend>Text color</legend>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="white"
                  onChange={(e) => {
                    if (e.target.value === "on") {
                      setColor("white");
                    }
                  }}
                  checked={color === "white"}
                />
                <label htmlFor="white">White</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="black"
                  onChange={(e) => {
                    if (e.target.value === "on") {
                      setColor("black");
                    }
                  }}
                  checked={color === "black"}
                />
                <label htmlFor="black">Black</label>
              </div>
            </fieldset>

            <label htmlFor="image" className="block">
              Image
            </label>
            <input
              className="mb-4"
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .tif, .tiff|image/*"
              id="image"
              onChange={(e) => {
                setBgFile(e.target.files[0]);
              }}
            />

            <label htmlFor="zoom" className="block">
              Zoom: {zoom}%
            </label>
            <input
              className="mb-4 w-80"
              id="zoom"
              type="range"
              min="100"
              max="200"
              step="1"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              value={zoom}
            />

            <fieldset className="pb-4">
              <legend>Aspect ratio</legend>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="square"
                  onChange={(e) => {
                    if (e.target.value === "on") {
                      setAspectRatio("square");
                    }
                  }}
                  checked={aspectRatio === "square"}
                />
                <label htmlFor="square">Square</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="portrait"
                  onChange={(e) => {
                    if (e.target.value === "on") {
                      setAspectRatio("portrait");
                    }
                  }}
                  checked={aspectRatio === "portrait"}
                />
                <label htmlFor="portrait">Portrait</label>
              </div>
            </fieldset>

            <div className="text-black">
              <Button onClick={() => download(thumbnail.current)}>
                Download Jpeg
              </Button>
            </div>
          </form>
        </div>

        {/* Viewer */}

        <div className="relative grid justify-center bg-black p-4 md:p-20">
          <div
            ref={thumbnail}
            className={cx(
              "bg-white overflow-hidden scale-[0.3] md:scale-50 origin-top-left",
              {
                "h-[1080px] w-[1080px]": aspectRatio === "square",
                "h-[1920px] w-[1080px]": aspectRatio === "portrait",
              }
            )}
          >
            <div
              className={cx(
                "absolute bottom-40 left-20 z-10 grid max-w-[600px]",
                {
                  "text-white": color === "white",
                  "text-black": color === "black",
                }
              )}
            >
              <div
                className={cx("flex border-b-2 pb-4 mb-4", {
                  "border-white": color === "white",
                  "border-black": color === "black",
                })}
              >
                <ColorLogo className="w-40 pr-4 stroke-current" />
                <p className="text-9xl leading-[110px] font-heading">
                  Oroko
                  <br />
                  Radio
                </p>
              </div>
              <div className="grid grid-cols-[2fr,1fr]">
                <p className="text-2xl break-words uppercase pr-8">{title}</p>
                {dateTime ? (
                  <div
                    className={cx("justify-self-end text-lg uppercase", {
                      "text-white": color === "white",
                      "text-black": color === "black",
                    })}
                  >
                    <p>{dayjs(dateTime).format("ddd DD MMM YYYY")}</p>
                    <p>
                      {dayjs(dateTime).format("h:mmA")} -{" "}
                      {dayjs(dateTime)
                        .add(durationHr, "h")
                        .add(durationMin, "m")
                        .format("h:mmA")}{" "}
                      GMT
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
            {bgPreview ? (
              <div className={`absolute h-full w-full overflow-hidden`}>
                <div className="relative h-full">
                  <div
                    ref={imageRef}
                    className={`absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-full w-full`}
                  >
                    <NextImage
                      className={`h-full w-full object-cover`}
                      src={bgPreview}
                      alt=""
                      height={bgHeight}
                      width={bgWidth}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
