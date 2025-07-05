import React from "react";

import { InferGetStaticPropsType } from "next";
import { getActivationsPage } from "../../lib/contentful/pages/activations";
import AllActivations from "../../views/AllActivations";
import Meta from "../../components/Meta";

export async function getStaticProps({ preview = false }) {
  return {
    props: { preview, ...(await getActivationsPage(preview)) },
    revalidate: 60,
  };
}

export default function ActivationsPage({
  activations,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Meta title="Activations" />
      <AllActivations activations={activations} />
    </>
  );
}
