import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import cx from "classnames";
import Meta from "../components/Meta";
import Button from "../components/ui/Button";
import NextImage from "next/image";
import dayjs from "dayjs";
import Logo from "../icons/Logo";

const getMeta = async (url: string) => {
  const img = new Image();
  img.src = url;
  await img.decode();
  return img;
};

function download(element: HTMLDivElement) {
  domtoimage
    .toJpeg(element, {
      style: {
        transform: "scale(1)",
      },
    })
    .then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "oroko-thumbnail.jpeg";
      link.href = dataUrl;
      link.click();
    });
}

export default function ThumbnailGenerator() {
  const thumbnail = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const [title, setTitle] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [aspectRatio, setAspectRatio] = useState<"square" | "portrait">(
    "square"
  );
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>("");
  const [bgHeight, setBgHeight] = useState<number>(0);
  const [bgWidth, setBgWidth] = useState<number>(0);
  const [zoom, setZoom] = useState<string>("100");

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
      <Meta title="Thumbnail Generator" />
      <div className="grid md:grid-cols-[1fr,3fr]">
        <div className="grid items-center">
          {/* Editor */}

          <form className="p-4">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              id="title"
              className="border-black border px-4 py-2 mb-4 block"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label htmlFor="date-time" className="block">
              Date and time
            </label>
            <input
              className="mb-4"
              id="date-time"
              type="datetime-local"
              onChange={(e) => {
                const date = new Date(e.target.value);
                setDateTime(date);
              }}
            />

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
              className="mb-4"
              id="zoom"
              type="range"
              min="100"
              max="200"
              step="1"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
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
            <Button onClick={() => download(thumbnail.current)}>
              Download Jpeg
            </Button>
          </form>
        </div>

        {/* Viewer */}

        <div className="relative grid justify-center bg-black">
          <div
            ref={thumbnail}
            className={cx("bg-white overflow-hidden scale-50", {
              "h-[1080px] w-[1080px]": aspectRatio === "square",
              "h-[1920px] w-[1080px]": aspectRatio === "portrait",
            })}
          >
            <div className="absolute bottom-20 left-20 text-white z-10 grid max-w-2xl">
              <div className="grid grid-cols-2 text-white border-white border-b-2 pb-4 mb-4">
                <Logo className="w-40 stroke-current" />
                <p className="text-8xl font-heading">
                  Oroko
                  <br />
                  Radio
                </p>
              </div>
              <div className="grid grid-cols-2">
                <p className="text-5xl pr-5">{title}</p>
                {dateTime ? (
                  <div className="text-white text-2xl uppercase">
                    <p>{dayjs(dateTime).format("ddd DD MMMM YYYY")}</p>
                    <p>
                      {dayjs(dateTime).format("h:mmA")} -{" "}
                      {dayjs(dateTime).add(1, "h").format("h:mmA")} GMT
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
