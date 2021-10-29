import Head from "next/head";
import type { NextPage } from "next";
import Splash from "../views/splash";
import Meta from "../components/Meta";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Oroko Radio - Stay Tuned</title>
        <Meta />
      </Head>
      <Splash />
    </main>
  );
};

export default Home;
