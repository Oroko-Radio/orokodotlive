import type { NextPage } from "next";
import Splash from "../views/splash";
import Meta from "../components/Meta";

const Home: NextPage = () => {
  return (
    <main>
      <Meta title="Oroko Radio - Stay Tuned" />
      <Splash />
    </main>
  );
};

export default Home;
