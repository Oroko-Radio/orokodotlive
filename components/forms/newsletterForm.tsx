import { useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import DotButton from "../ui/DotButton";
import Modal from "react-modal";
import logoSmall from "../../images/logo-small-outline.svg";
import closeIcon from "../../images/ui/close_icon.svg";
import Logo from "../../icons/Logo";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#2F2726",
    borderRadius: "20px",
    border: "none",
  },
  overlay: { zIndex: 100, backgroundColor: "rgba(0, 0, 0, 0.4)" },
};

export default function NewsletterForm() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      email: {
        value: string;
      };
    };

    try {
      const email = target.email.value;

      const r = await fetch(`/api/newsletter/subscribe`, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (r.ok) {
        setShowModal(true);
        return;
      }

      throw new Error((await r.json()).error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form method="POST" onSubmit={handleSubmit}>
      <input
        className="xl:text-lg lg:w-3/4 mb-4 mr-4 lg:mr-10 px-3 py-1 rounded-full border-black border-2 font-serif"
        autoComplete="email"
        id="email"
        name="email"
        placeholder="Your email here"
        required
        aria-label="email"
        type="email"
      />

      <button type="submit" className="py-2">
        <DotButton size="large">Submit</DotButton>
      </button>

      <Modal
        isOpen={showModal}
        style={customStyles}
        onRequestClose={() => setShowModal(false)}
        bodyOpenClassName="modal_body"
      >
        <button
          onClick={() => setShowModal(false)}
          className="text-white absolute right-4 top-4"
        >
          <Image src={closeIcon} alt="Close" height="20" width="20" />
        </button>
        <div className="flex flex-col justify-center mt-6 px-8">
          <div className="w-20 self-center">
            <Logo className="text-white stroke-current" />
          </div>
          <p className="mt-4 mb-8 font-sans font-medium xl:text-base text-white">
            Thank you for subscribing!
          </p>
        </div>
      </Modal>
    </form>
  );
}
