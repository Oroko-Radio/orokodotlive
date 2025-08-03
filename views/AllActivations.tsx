import cn from "classnames";
import dayjs from "dayjs";
import Card from "../components/Card";
import Tag from "../components/Tag";
import { ActivationInterface } from "../types/shared";

const AllActivations = ({
  activations,
  heading = "All Activations",
}: {
  activations: ActivationInterface[];
  heading?: string;
}) => {
  return (
    <div id="all-activations" className={cn("bg-offBlack")}>
      <div className="py-8 px-4 md:px-8 pb-0">
        <h1 className="font-serif text-4xl md:text-5xl text-white">
          {heading}
        </h1>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-6 p-4 md:p-8 pb-10 md:pb-12">
        {activations.map(({ title, year, slug, city, coverImage }, idx) => (
          <div key={idx}>
            <div className="border-black border-2 bg-white">
              <Card
                imageUrl={coverImage.url}
                title={title}
                link={`/activations/${slug}`}
              >
                <div className="p-4">
                  <div className="flex flex-wrap items-center gap-1 mb-6">
                    {city && <Tag text={city.name} color="black" card />}
                    <p className="font-sans text-sm md:text-base ml-2 font-semibold">
                      {dayjs(year).format("YYYY")}
                    </p>
                  </div>
                  <h1 className="font-heading card-leading mb-2 text-4xl">
                    {title}
                  </h1>
                </div>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllActivations;
