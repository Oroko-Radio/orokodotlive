import { useRouter } from "next/dist/client/router";

export default function BackButton() {
  const router = useRouter();

  const handleOnClick = () => router.back();

  return (
    <button
      className="py-1 px-4 md:px-8 border-2 rounded-full border-black bg-white focus:outline-none focus:ring-4 font-sans font-semibold text-base md:text-xl"
      onClick={handleOnClick}
    >
      Back
    </button>
  );
}
