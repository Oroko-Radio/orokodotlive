import Image from "next/image";
import contactBG from "/public/static/contact-bg.svg";

const Contact = () => {
  return (
    <div className="relative h-96 flex items-center justify-center border-b-2 border-black">
      <Image
        src={contactBG}
        alt=""
        layout="fill"
        className="-z-10"
        objectFit="cover"
      />
      <div className="z-10 flex flex-col items-center text-center justify-center">
        <p className="font-bold text-2xl mb-4">Radio Residencies</p>
        <h2 className="font-serif text-5xl mb-4">Applications are now open</h2>
        <p className="font-serif mb-4 max-w-sm">
          We are currently accepting applications to become an Oroko Radio
          resident - fill in the forms below to apply. Applications are accepted
          in English and French.
        </p>
        <div className="flex">
          <div className="border-2 border-black bg-white rounded-full font-bold px-3 py-1 mr-4">
            Apply Now (EN)
          </div>
          <div className="border-2 border-black bg-white rounded-full font-bold px-3 py-1">
            Apply Now (FR)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
