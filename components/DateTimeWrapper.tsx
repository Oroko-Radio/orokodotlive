"use client";

import dynamic from "next/dynamic";

const DateTime = dynamic(() => import("./DateTime"), {
  ssr: false,
  loading: () => <span>...</span>
});

interface DateTimeWrapperProps {
  date: string | Date;
  format?: string;
  showTime?: boolean;
  className?: string;
}

export default function DateTimeWrapper(props: DateTimeWrapperProps) {
  return <DateTime {...props} />;
}