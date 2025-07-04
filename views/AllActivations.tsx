import cn from "classnames";
import Link from "next/link";
import dayjs from "dayjs";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { ActivationInterface } from "../types/shared";
import DotButton from "../components/ui/DotButton";

const AllActivations = ({
  activations,
  heading = "All Activations",
  bgColor = "white",
  home = false,
}: {
  activations: ActivationInterface[];
  heading?: string;
  bgColor?: "white" | "gray";
  home?: boolean;
}) => {
  return (
    <div
      id="all-activations"
      className={cn("", {
        "bg-orokoGray": bgColor === "gray",
      })}
    >
      <div className="flex justify-between py-8 px-4 md:px-8 pb-0">
        <h1 className="font-serif text-4xl md:text-5xl">{heading}</h1>
        {home && (
          <Link href="/activations#all-activations" passHref>
            <div className="hidden md:block mt-4">
              <DotButton transparent size="large">
                All Activations
              </DotButton>
            </div>
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 p-4 md:p-8 pb-10 md:pb-12">
        {activations.map(
          (
            { title, year, slug, city, coverImage },
            idx
          ) => (
            <div key={idx}>
              <div className="border-black border-2 bg-white">
                <Card
                  imageUrl={coverImage.url}
                  title={title}
                  link={`/activations/${slug}`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1 mb-6">
                      {city && <Tag text={city.name} color="black" card />}
                    </div>
                    <p className="font-sans mb-2 font-medium">
                      {dayjs(year).format("YYYY")}
                    </p>
                    <h1 className="font-heading card-leading mb-2 text-4xl">
                      {title}
                    </h1>
                  </div>
                </Card>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AllActivations;
