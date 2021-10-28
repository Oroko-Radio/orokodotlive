import Image from "next/image";
import shop from "../images/view.jpg";

const About = () => {
  return (
    <div className="grid md:grid-cols-2 auto-rows-min border-b-2 border-black">
      <div className="relative h-96 md:h-auto">
        <Image
          src={shop}
          alt="Shop"
          placeholder="blur"
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="px-6 lg:px-12 py-10 xl:py-20 max-w-xl mx-auto">
        <h3 className="font-bold text-2xl xl:text-3xl text-center mb-8">
          About Us
        </h3>
        <h2 className="font-serif text-5xl xl:text-6xl text-center mb-8">
          Broadcasting from Accra and beyond
        </h2>
        <p>
          Oroko is a not-for-profit independent internet radio station based in
          Accra, Ghana. We aim to connect, inspire and empower through
          conversation, collaboration and community.
        </p>
        <h3 className="font-heading text-3xl leading-8 xl:text-4xl text-center mb-6">
          »Our global platform is for African and Diasporic voices to be heard,
          in our own words.«
        </h3>
        <p>
          We aim to reclaim and recenter narratives from the African and
          Diasporic artistic communities, with a particular focus on local
          perspectives in Accra, in addition to cultivating and nurturing
          relationships with like-minded projects across the globe. Oroko Radio
          will shine a spotlight on alternative sounds and thoughts coming from,
          and influenced by the Continent.
        </p>
      </div>
    </div>
  );
};

export default About;
