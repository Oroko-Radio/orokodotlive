import Head from "next/head";

type MetaProps = {
  title: string;
  noIndex?: boolean;
};

const Meta = ({ title, noIndex = false }: MetaProps) => {
  const concatenatedTitle = "Oroko | " + title;

  return (
    <Head>
      <title>{concatenatedTitle}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Oroko is a not-for-profit independent internet radio station based in Accra, Ghana. We aim to connect, inspire and empower through conversation, collaboration and community."
      />
      <meta property="og:title" content="Oroko Radio" />
      <meta property="og:site_name" content="Oroko Radio" />
      <meta
        property="og:description"
        content="Oroko is a not-for-profit independent internet radio station based in Accra, Ghana. We aim to connect, inspire and empower through conversation, collaboration and community."
      />
      <meta property="og:url" content="https://oroko.live/" />
      <meta property="og:type" content="website" />
      <meta
        property="og:image:url"
        content="https://oroko.live/OROKO_OG_1200px.png"
      />
      <meta
        property="og:image:secure_url"
        content="https://oroko.live/OROKO_OG_1200px.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="Oroko Radio Logo" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Head>
  );
};

export default Meta;
