"use client";

import React from "react";

interface SliderContextType {
  elementRef: React.RefObject<HTMLElement | null>;
}

const SliderContext = React.createContext<SliderContextType | null>(null);

export default SliderContext;
