import { useRef, useState } from "react";
import domtoimage from "dom-to-image";

export default function ThumbnailGenerator() {
  const thumbnail = useRef<HTMLDivElement | null>(null);
  const [title, setTitle] = useState<string>("");

  function download() {
    console.log(thumbnail);
    domtoimage.toJpeg(thumbnail.current).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
  }

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div>
        <input
          className="border-black border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={download}>Download jpeg</button>
      </div>
      <div ref={thumbnail} className="bg-white">
        <h2>{title}</h2>
      </div>
    </div>
  );
}
