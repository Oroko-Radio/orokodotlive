import ConcentricCircles from "./ui/ConcentricCircles";

export default function FeaturedTag() {
  return (
    <div className="flex items-center mb-4 pl-1">
      <ConcentricCircles />
      <p className="font-sans text-sm md:text-base font-semibold uppercase">
        Featured Show
      </p>
    </div>
  );
}
