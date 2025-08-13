'use client';

import dynamic from "next/dynamic";
import { LivePlayerLoading } from "./LivePlayer";

const MixcloudPlayer = dynamic(() => import("./mixcloudPlayer"), {
  ssr: false,
});

const LivePlayerClient = dynamic(() => import("./LivePlayer"), {
  ssr: false,
  loading: LivePlayerLoading,
});

export { MixcloudPlayer, LivePlayerClient as LivePlayer };