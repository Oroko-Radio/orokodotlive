import { InferGetStaticPropsType } from "next";
import React from "react";
import NewsletterForm from "../components/forms/newsletterForm";
import TitleBox from "../components/TitleBox";
import { getNewsletterPage } from "../lib/contentful/pages/newsletter";
import { renderRichTextWithImages } from "../lib/rich-text";
import SinglePage from "../views/SinglePage";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getNewsletterPage(preview)) },
    revalidate: 60 * 60 * 24,
  };
}

export default function Newsletter({
  title,
  subtitle,
  coverImage,
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SinglePage
      coverImage="/static/newsletter-bg.svg"
      coverImageAlt="Newsletter"
    >
      <TitleBox bgColor="orange">
        <div className="container max-w-4xl mx-auto">
          <h1 className="mt-6 md:mt-0 text-5xl md:text-6xl lg:text-7xl mb-4 font-heading md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-6xl">{subtitle}</h2>
        </div>
      </TitleBox>
      <div className="border-b-2 border-black py-10">
        <section className="container max-w-4xl mx-auto">
          <p className="mb-8 text-2xl font-sans">
            Sign up to the Oroko newsletter to stay up to date with all our
            upcoming events, projects, announcements, residencies and more.
          </p>
          <NewsletterForm />
        </section>
      </div>
      {content && (
        <div className="bg-orokoGray">
          <section className="container max-w-4xl mx-auto rich-text pt-12 pb-24">
            {renderRichTextWithImages(content)}
          </section>
        </div>
      )}
    </SinglePage>
  );
}
