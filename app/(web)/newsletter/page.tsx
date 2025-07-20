import type { Metadata } from "next";
import TitleBox from "../../../components/TitleBox";
import { getNewsletterPage } from "../../../lib/contentful/pages/newsletter";
import { renderRichTextWithImages } from "../../../lib/rich-text";
import SinglePage from "../../../views/SinglePage";
import NewsletterWidget from "../../../components/NewsletterWidget";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Newsletter - OROKO RADIO",
};

export default async function Newsletter() {
  const { title, subtitle, content } = await getNewsletterPage(false);

  return (
    <SinglePage
      coverImage="/static/newsletter-bg.svg"
      coverImageAlt="Newsletter"
      repeatCover={false}
      title="Newsletter"
    >
      <TitleBox
        bgColor="orange"
        title={title}
        slug="newsletter"
        boxText="Newsletter"
      >
        <div className="container max-w-5xl mx-auto">
          <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
            Newsletter
          </p>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
            {title}
          </h1>
          <h2 className="font-serif text-4xl lg:text-5xl">{subtitle}</h2>
        </div>
      </TitleBox>
      <div className="border-b-2 border-black py-6 md:py-8">
        <section className="container max-w-5xl mx-auto">
          <p className="mb-8 text-lg md:text-xl xl:text-2xl font-sans">
            Sign up to the Oroko newsletter to stay up to date with all our
            upcoming events, projects, announcements, residencies and more.
          </p>
          <div className="flex justify-center md:block">
            <NewsletterWidget />
          </div>
        </section>
      </div>
      {content && (
        <div className="bg-orokoGray">
          <section className="container max-w-5xl mx-auto rich-text pt-12 pb-24">
            {renderRichTextWithImages(content)}
          </section>
        </div>
      )}
    </SinglePage>
  );
}
