import Image from "next/image";

const About = () => {
  return (
    <div className="grid md:grid-cols-2 auto-rows-min border-b-2 border-black">
      <div className="relative h-96 md:h-auto">
        <Image
          src="/public/static/shop.jpg"
          alt=""
          objectFit="cover"
          layout="fill"
        />
      </div>
      <div className="p-12 max-w-xl mx-auto">
        <p className="font-bold text-2xl text-center mb-8">About Us</p>
        <h2 className="font-serif text-5xl text-center mb-8">
          Broadcasting from Accra and beyond
        </h2>
        <p className="font-serif mb-6">
          Oroko is a not-for-profit independent internet radio station based in
          Accra, Ghana. We aim to connect, inspire and empower through
          conversation, collaboration and community.
        </p>
        <h3 className="font-heading text-3xl text-center mb-6">
          »Our global platform is for African and Diasporic voices to be heard,
          in our own words.«
        </h3>
        <p className="font-serif">
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
