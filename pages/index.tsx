import type { NextPage } from "next";
import Hero from "../components/Hero";
import Meta from "../components/Meta";
import Newsletter from "../components/Newsletter";

const Home: NextPage = () => {
  return (
    <main>
      <Meta title="Oroko Radio" />
      <Hero />
      <Newsletter />
    </main>
  );
};

export default Home;
