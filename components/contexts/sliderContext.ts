"use client";

import React from "react";

interface SliderContextType {
  elementRef: React.RefObject<HTMLDivElement | null>;
}

const SliderContext = React.createContext<SliderContextType | null>(null);

export default SliderContext;
