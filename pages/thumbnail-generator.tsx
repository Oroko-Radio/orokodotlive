import { useEffect, useMemo, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import cx from "classnames";
import Meta from "../components/Meta";
import Button from "../components/ui/Button";
import NextImage from "next/image";

export default function ThumbnailGenerator() {
  const thumbnail = useRef<HTMLDivElement | null>(null);

  const [title, setTitle] = useState<string>("");
  const [aspectRatio, setAspectRatio] = useState<"square" | "portrait">(
    "square"
  );
  const [bgFile, setBgFile] = useState<File | null>(null);
  const [bgPreview, setBgPreview] = useState<string | null>("");
  const [bgHeight, setBgHeight] = useState<number>(0);
  const [bgWidth, setBgWidth] = useState<number>(0);

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

  const getMeta = async (url) => {
    const img = new Image();
    img.src = url;
    await img.decode();
    return img;
  };

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

  return (
    <>
      <Meta title="Thumbnail Generator" />
      <div className="grid md:grid-cols-[1fr,3fr]">
        <div className="grid items-center">
          <form className="p-4">
            <label htmlFor="title" className="block">
              Title
            </label>

            <input
              id="title"
              className="border-black border mb-4 block"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
            <Button onClick={download}>Download Jpeg</Button>
          </form>
        </div>
        <div className="grid justify-center bg-black">
          <div
            ref={thumbnail}
            className={cx("bg-white scale-50", {
              "h-[1080px] w-[1080px]": aspectRatio === "square",
              "h-[1920px] w-[1080px]": aspectRatio === "portrait",
            })}
          >
            <h2 className="text-2xl">{title}</h2>
            {bgPreview ? (
              <NextImage
                className="absolute w-full h-full object-cover"
                src={bgPreview}
                alt=""
                height={bgHeight}
                width={bgWidth}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
