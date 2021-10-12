import Document, { Head, Html, Main, NextScript } from "next/document";

class OrokoDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>

        <body className="antialiased">
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default OrokoDocument;
