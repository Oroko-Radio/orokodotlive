import Head from "next/head";

type MetaProps = {
  title: string;
};

const Meta = ({ title }: MetaProps) => {
  return (
    <Head>
      <title>{title}</title>
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
        property="og:image"
        content="https://oroko.live/oroko_logo_full.jpg"
      />
      <meta property="og:image:width" content="1000" />
      <meta property="og:image:height" content="1000" />
      <meta property="og:image:alt" content="Oroko Radio Logo" />
    </Head>
  );
};

export default Meta;
