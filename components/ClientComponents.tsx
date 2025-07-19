'use client';

import dynamic from "next/dynamic";
import { LivePlayerLoading } from "./LivePlayer";

const MixcloudPlayer = dynamic(() => import("./mixcloudPlayer"), {
  ssr: false,
});

const LivePlayer = dynamic(() => import("./LivePlayer"), {
  ssr: false,
  loading: LivePlayerLoading,
});

export { MixcloudPlayer, LivePlayer };