"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useEffect, useState } from "react";

dayjs.extend(utc);
dayjs.extend(timezone);

interface DateTimeProps {
  date: string | Date;
  format?: string;
  showTime?: boolean;
  className?: string;
}

export default function DateTime({
  date,
  format,
  showTime = true,
  className,
}: DateTimeProps) {
  const [formattedDate, setFormattedDate] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Parse the date as UTC and convert to user's local timezone
    const dateObj = dayjs.utc(date);

    // Determine format based on props
    let displayFormat = format;
    if (!displayFormat) {
      displayFormat = showTime ? "ddd DD MMMM YYYY, HH:mm" : "ddd DD MMMM YYYY";
    }

    // Convert to local timezone and format
    const localDate = dateObj.local().format(displayFormat);
    setFormattedDate(localDate);
  }, [date, format, showTime]);

  // Return a placeholder or the server-rendered date while client is loading
  // This prevents hydration mismatches
  if (!isClient) {
    // Return empty span with same className to prevent layout shift
    return <span className={className}></span>;
  }

  return <span className={className}>{formattedDate}</span>;
}
