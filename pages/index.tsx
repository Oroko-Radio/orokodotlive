import type { NextPage } from "next";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Meta from "../components/Meta";

const Home: NextPage = () => {
  return (
    <main>
      <Meta title="Oroko Radio" />
      <Hero />
      <Hero />
    </main>
  );
};

export default Home;
