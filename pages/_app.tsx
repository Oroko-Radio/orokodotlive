import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { LivePlayerLoading } from "../components/LivePlayer";
import "../styles/globals.css";

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
      <Footer />
    </Fragment>
  );
}

export default OrokoApp;
