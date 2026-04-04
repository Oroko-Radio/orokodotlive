import type { Metadata } from "next";
import React from "react";
import SinglePage from "@/views/SinglePage";
import Tag from "@/components/Tag";
import dayjs from "dayjs";
import TitleBox from "@/components/TitleBox";
import {
  getActivationBySlug,
  getAllActivationSlugs,
} from "@/lib/payload/pages/activations";
import { renderPayloadRichText } from "@/lib/rich-text";
import { draftMode } from "next/headers";

export const revalidate = 3600; // 1 hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const activation = await getActivationBySlug(slug, isDraftMode);
    return {
      title: activation.title,
    };
  } catch {
    return {
      title: "Activation",
    };
  }
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllActivationSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export default async function ActivationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    const activation = await getActivationBySlug(slug, isDraftMode);

    const coverImageUrl =
      typeof activation.coverImage === "object" &&
      activation.coverImage?.sizes?.["large-full"]?.url
        ? activation.coverImage.sizes["large-full"].url
        : typeof activation.coverImage === "object" &&
            activation.coverImage?.url
          ? activation.coverImage.url
          : "/default-cover.jpg";

    const cityName =
      typeof activation.city === "object" && activation.city
        ? activation.city.name
        : "";

    return (
      <SinglePage
        coverImage={coverImageUrl}
        coverImageAlt={activation.title}
        withBackButton
        title={activation.title}
      >
        <TitleBox
          boxText={dayjs(activation.year).format("YYYY")}
          title={activation.title}
          slug={`activations/${activation.slug}`}
        >
          <div className="container max-w-5xl mx-auto">
            <div className="mb-6 mt-6 md:mt-0">
              <div className="flex md:inline-flex mb-4 md:mb-0 mr-6">
                {cityName && <Tag text={cityName} color="black" />}
              </div>
              {activation.year && (
                <p className="hidden md:inline-block mb-0 font-sans font-semibold tracking-wide text-lg">
                  {dayjs(activation.year).format("YYYY")}
                </p>
              )}
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
              {activation.title}
            </h1>
          </div>
        </TitleBox>
        <section className="rich-text py-6 md:py-8 mb-24">
          {activation.content && renderPayloadRichText(activation.content)}
        </section>
      </SinglePage>
    );
  } catch (error) {
    console.error("Failed to load activation:", error);
    return (
      <SinglePage
        coverImage={undefined}
        coverImageAlt="Activation"
        withBackButton
        title="Activation Not Found"
      >
        <TitleBox
          boxText={dayjs().format("YYYY")}
          title="Activation Not Found"
          slug={`activations/${slug}`}
        >
          <div className="container max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl lg:pt-6 mb-4 font-heading md:mr-36 lg:mr-40">
              Activation Not Found
            </h1>
          </div>
        </TitleBox>
        <section className="container max-w-5xl mx-auto rich-text py-6 md:py-8 mb-24">
          <p>This activation could not be found.</p>
        </section>
      </SinglePage>
    );
  }
}
