import Head from "next/head";
import type { NextPage } from "next";
import Splash from "../views/splash";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Oroko Radio - Stay Tuned</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Oroko is a not-for-profit independent internet radio station based in Accra, Ghana. We aim to connect, inspire and empower through conversation, collaboration and community."
        />
      </Head>
      <Splash />
    </main>
  );
};

export default Home;
