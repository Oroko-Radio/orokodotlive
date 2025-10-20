import type { Metadata } from "next";
import TitleBox from "@/components/TitleBox";
import SinglePage from "@/views/SinglePage";
import NewsletterWidget from "@/components/NewsletterWidget";
import { getPageBySlug } from "@/lib/payload/pages/pages";
import { renderPayloadRichText } from "@/lib/rich-text";
import { draftMode } from "next/headers";

export const revalidate = 3600; // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const page = await getPageBySlug("sign-up-to-our-newsletter", isDraftMode);
    return {
      title: page.title,
    };
  } catch {
    return {
      title: "Newsletter",
    };
  }
}

export default async function Newsletter() {
  const { isEnabled: isDraftMode } = await draftMode();
  try {
    const page = await getPageBySlug("sign-up-to-our-newsletter", isDraftMode);
    
    return (
      <SinglePage
        coverImage={
          typeof page.coverImage === "object" && page.coverImage?.sizes?.["large-full"]?.url
            ? page.coverImage.sizes["large-full"].url
            : (typeof page.coverImage === "object" && page.coverImage?.url ? page.coverImage.url : "/static/newsletter-bg.svg")
        }
        coverImageAlt={page.title}
        repeatCover={false}
        title={page.title}
      >
        <TitleBox
          bgColor="orange"
          title={page.title}
          slug="newsletter"
          boxText="Newsletter"
        >
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              Newsletter
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
              {page.title}
            </h1>
            {page.subtitle && (
              <h2 className="font-serif text-4xl lg:text-5xl">{page.subtitle}</h2>
            )}
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
        <div className="bg-orokoGray">
          <section className="container max-w-5xl mx-auto rich-text pt-12 pb-24">
            {page.content && renderPayloadRichText(page.content)}
          </section>
        </div>
      </SinglePage>
    );
  } catch (error) {
    console.error("Failed to load newsletter page:", error);
    // Fallback content
    return (
      <SinglePage
        coverImage="/static/newsletter-bg.svg"
        coverImageAlt="Newsletter"
        repeatCover={false}
        title="Newsletter"
      >
        <TitleBox
          bgColor="orange"
          title="Sign up to our Newsletter"
          slug="newsletter"
          boxText="Newsletter"
        >
          <div className="container max-w-5xl mx-auto">
            <p className="hidden md:block mb-4 ml-0.5 font-sans font-semibold tracking-wide text-xl lg:text-2xl">
              Newsletter
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl mb-4 font-heading heading-leading md:mr-36">
              Sign up to our Newsletter
            </h1>
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
        <div className="bg-orokoGray">
          <section className="container max-w-5xl mx-auto rich-text pt-12 pb-24">
            <p>Newsletter content is currently being migrated.</p>
          </section>
        </div>
      </SinglePage>
    );
  }
}
