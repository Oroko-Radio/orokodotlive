import type { NextPage } from "next";
import Splash from "../views/splash";
import Meta from "../components/Meta";
import LivePlayer from "../components/LivePlayer";

const Home: NextPage = () => {
  return (
    <main>
      <Meta title="Oroko Radio" />
      <LivePlayer />
    </main>
  );
};

export default Home;
