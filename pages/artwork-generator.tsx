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
  const [artists, setArtists] = useState<string>("");
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
  const [align, setAlign] = useState<"center" | "top" | "bottom">("center");
  const [justify, setJustify] = useState<"center" | "left" | "right">("center");
  const [color, setColor] = useState<"black" | "white">("black");
  const [error, setError] = useState<string | null>(null);

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

  function handleDownload() {
    if (!title || !artists || !dateTime) {
      setError("The fields Title, Artists and Date and Time are required");
      return;
    }
    setError(null);
    download(thumbnail.current);
  }

  return (
    <>
      <Meta title="Artwork Generator" noIndex />
      <div className="grid md:grid-cols-[1fr,3fr] max-w-full overflow-hidden">
        {/* Editor */}

        <div className="bg-offBlack text-white grid">
          <form className="p-4">
            <div className="p-2 mb-4 max-w-xs lg:max-w-sm text-sm lg:text-base text-white bg-red-600 border-red-400 border rounded-md">
              <p className="uppercase mb-2">
                Put the name of the show as the Title, and use the Artists field
                to list artists and guests. Use one of the following formats:
              </p>
              <p className="mb-2">
                1. [Show name] with [Artist name]
                <br />
                EXAMPLE: The Radio Show with Jinan, Nico and Kike
              </p>
              <p className="mb-2">
                2. [Show name] invites [Artist name]
                <br />
                EXAMPLE: The Radio Show invites Jinan, Nico and Kike
              </p>
              <hr className="mb-2" />
              <p>
                Download might not work on some mobile browsers. For best
                support use Chrome if you’re on mobile.
              </p>
            </div>
            <label htmlFor="title" className="block">
              Title*
            </label>
            <input
              id="title"
              className="text-black border-black border px-4 py-2 mb-4 w-80 block"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="artists" className="block">
              Artists*
            </label>
            <input
              id="artists"
              className="text-black border-black border px-4 py-2 mb-4 w-80 block"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
            />

            <label htmlFor="date-time" className="block">
              Date and time*
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

            <div className="flex gap-16">
              <fieldset className="pb-4">
                <legend>Align</legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="top"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setAlign("top");
                      }
                    }}
                    checked={align === "top"}
                  />
                  <label htmlFor="top">Top</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="align-center"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setAlign("center");
                      }
                    }}
                    checked={align === "center"}
                  />
                  <label htmlFor="align-center">Center</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="bottom"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setAlign("bottom");
                      }
                    }}
                    checked={align === "bottom"}
                  />
                  <label htmlFor="bottom">Bottom</label>
                </div>
              </fieldset>

              <fieldset className="pb-4">
                <legend>Justify</legend>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="left"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setJustify("left");
                      }
                    }}
                    checked={justify === "left"}
                  />
                  <label htmlFor="left">Left</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="justify-center"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setJustify("center");
                      }
                    }}
                    checked={justify === "center"}
                  />
                  <label htmlFor="justify-center">Center</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="right"
                    onChange={(e) => {
                      if (e.target.value === "on") {
                        setJustify("right");
                      }
                    }}
                    checked={justify === "right"}
                  />
                  <label htmlFor="right">Right</label>
                </div>
              </fieldset>
            </div>

            <div className="text-black mb-4">
              <Button onClick={handleDownload}>Download Jpeg</Button>
              <p className="text-white mt-4">* Required field</p>
              {error && (
                <p className="text-white bg-red-600 border-red-400 border rounded-md p-2 mt-4">
                  {error}
                </p>
              )}
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
                "absolute bottom-40 left-20 z-10 grid max-w-[500px]",
                {
                  "text-white": color === "white",
                  "text-black": color === "black",
                }
              )}
            >
              <div
                className={cx("flex border-b-4 pb-4 mb-4", {
                  "border-white": color === "white",
                  "border-black": color === "black",
                })}
              >
                <ColorLogo className="w-[9.5rem] pr-4 stroke-current" />
                <p className="text-[9rem] leading-[95px] font-heading">
                  Oroko
                  <br />
                  <span className="tracking-wider">Radio</span>
                </p>
              </div>
              <div className="grid grid-cols-[9fr,5fr]">
                <p className="text-2xl font-semibold break-words uppercase pr-2">
                  {title} {artists}
                </p>
                {dateTime ? (
                  <div
                    className={cx("justify-self-end text-lg uppercase", {
                      "text-white": color === "white",
                      "text-black": color === "black",
                    })}
                  >
                    <p className="font-semibold">
                      {dayjs(dateTime).format("ddd DD MMM YYYY")}
                    </p>
                    <p className="font-semibold">
                      {dayjs(dateTime).format("h:mm")} -{" "}
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
                    className={cx(
                      `absolute left-1/2 -translate-x-1/2 h-full w-full`,
                      {
                        "top-1/2 -translate-y-1/2": align === "center",
                        "top-0": align === "top",
                        "bottom-0": align === "bottom",
                      }
                    )}
                  >
                    <NextImage
                      className={cx(`h-full w-full object-cover`, {
                        "object-left": justify === "left",
                        "object-right": justify === "right",
                      })}
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
