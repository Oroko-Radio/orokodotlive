import type { AppProps } from "next/app";
import "../styles/globals.css";

function OrokoApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default OrokoApp;
