import React from "react";
import { getActivationsPageSingle } from "../../lib/contentful/pages/activations";
import { getActivationPathsToPreRender } from "../../lib/contentful/paths";
import { renderRichTextWithImages } from "../../lib/rich-text";
import { ActivationInterface } from "../../types/shared";
import SinglePage from "../../views/SinglePage";
import Tag from "../../components/Tag";
import dayjs from "dayjs";
import TitleBox from "../../components/TitleBox";

type ActivationProps = {
  activation: ActivationInterface;
  preview: boolean;
  relatedActivations?: ActivationInterface[];
};

export default function Activation({
  activation,
  preview,
  relatedActivations,
}: ActivationProps) {
  const { coverImage, title, slug, year, city, content } = activation;

  return (
    <SinglePage
      coverImage={coverImage.url}
      coverImageAlt={title}
      withBackButton
      title={title}
    >
      <TitleBox
        boxText={dayjs(year).format("YYYY")}
        title={title}
        slug={`activations/${slug}`}
      >
        <div className="container max-w-5xl mx-auto">
          <div className="mb-6 mt-6 md:mt-0">
            <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
              <Tag text={city.name} color="black" />
            </div>
            {year && (
              <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
                {dayjs(year).format("YYYY")}
              </p>
            )}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
            {title}
          </h1>
        </div>
      </TitleBox>
      <section className="rich-text activation-content py-6 md:py-8 mb-24">
        {content && renderRichTextWithImages(content)}
      </section>
    </SinglePage>
  );
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any;
  preview: boolean;
}) {
  const data = await getActivationsPageSingle(params.slug, preview);

  return {
    props: { preview, ...data },
    revalidate: 60 * 60,
  };
}

export async function getStaticPaths() {
  const paths = await getActivationPathsToPreRender();

  return { paths, fallback: "blocking" };
}
