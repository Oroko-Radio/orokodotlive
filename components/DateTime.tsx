"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

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
  // Parse the date as UTC and convert to user's local timezone
  const dateObj = dayjs.utc(date);
  
  // Determine format based on props
  const displayFormat = format || (showTime ? "ddd DD MMMM YYYY, HH:mm" : "ddd DD MMMM YYYY");
  
  // Convert to local timezone and format
  const formattedDate = dateObj.local().format(displayFormat);

  return <span className={className}>{formattedDate}</span>;
}
