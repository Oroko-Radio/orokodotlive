import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LivePlayerLoading } from "../components/LivePlayer";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import SocialSection from "../components/SocialSection";

const MixcloudPlayer = dynamic(() => import("../components/mixcloudPlayer"), {
  ssr: false,
});

const LivePlayer = dynamic(() => import("../components/LivePlayer"), {
  ssr: false,
  loading: LivePlayerLoading,
});

function OrokoApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Header />
      <LivePlayer />

      <Component {...pageProps} />

      <MixcloudPlayer />

      <SocialSection className="hidden lg:flex fixed bottom-4 right-8" />
      <Footer />

      <Analytics />
    </Fragment>
  );
}

export default OrokoApp;
