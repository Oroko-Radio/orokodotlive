import React from "react";

export default function ConcentricCircles() {
  return (
    <div className="relative h-3 w-3 xl:h-4 xl:w-4 inline-block mr-2 xl:mr-3">
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-black rounded-full inline-block h-1.5 w-1.5 xl:h-2 xl:w-2"></div>
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-3.5 h-3.5 xl:w-4 xl:h-4 "></div>
      <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 border rounded-full border-black w-5 h-5 xl:w-6 xl:h-6"></div>
    </div>
  );
}
