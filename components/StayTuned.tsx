import Image from "next/image";
import logoSmall from "/public/static/logo-small-outline.svg";

const StayTuned = () => {
  return (
    <>
      {[...Array(3)].map((x, idx) => (
        <div className="flex align-middle items-center" key={idx}>
          <h1 className="font-heading inline text-5xl xl:text-6xl ml-3 mr-4">
            Oroko will launch December 2021
          </h1>
          <div>
            <Image
              src={logoSmall}
              alt="Oroko logo small"
              height="40"
              width="40"
            />
          </div>
          <h2 className="font-serif inline text-4xl xl:text-5xl ml-3 mr-4">
            Stay Tuned
          </h2>
          <div>
            <Image
              src={logoSmall}
              alt="Oroko logo small"
              height="40"
              width="40"
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default StayTuned;
