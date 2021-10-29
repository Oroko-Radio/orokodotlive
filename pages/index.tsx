import Head from "next/head";
import type { NextPage } from "next";
import Splash from "../views/splash";
import Meta from "../components/Meta";

const Home: NextPage = () => {
  return (
    <main>
      <Head>
        <Meta />
      </Head>
      <Splash />
    </main>
  );
};

export default Home;
