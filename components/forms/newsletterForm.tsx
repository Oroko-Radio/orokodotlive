import type { FormEvent } from "react";
import DotButton from "../ui/DotButton";

export default function NewsletterForm() {
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
        className="xl:text-lg mb-4 mr-4 px-3 py-1 rounded-full border-black border-2 font-serif"
        autoComplete="email"
        id="email"
        name="email"
        placeholder="Your email here"
        required
        aria-label="email"
        type="email"
      />
      <button type="submit">
        <DotButton>Submit</DotButton>
      </button>
    </form>
  );
}
