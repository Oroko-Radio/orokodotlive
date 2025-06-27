import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LivePlayerLoading } from "../components/LivePlayer";
import "../styles/globals.css";
import { debounce } from "../util";
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
  // reload page when resizing horizontally, to keep correct slider distance
  /*
  const [prevWidth, setPrevWidth] = useState<number>(0);

  function handleResize() {
    if (
      prevWidth > 0 &&
      window.innerWidth !== prevWidth &&
      location.pathname !== "/artwork-generator"
    ) {
      setPrevWidth(window.innerWidth);
      location.reload();
    }
  }

  useEffect(() => {
    window.addEventListener("resize", debounce(handleResize, 500));
    return () => {
      window.removeEventListener("resize", debounce(handleResize, 500));
    };
  });

  useEffect(() => {
    setPrevWidth(window.innerWidth);
  }, []);
  */
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
