import type { Metadata } from "next";
import React from "react";
import AllActivations from "@/views/AllActivations";
import { getAllActivations } from "@/lib/payload/pages/activations";
import type { ActivationInterface } from "@/types/shared";

export const revalidate = 3600; // 1 hour

export const metadata: Metadata = {
  title: "Activations",
};

export default async function ActivationsPage() {
  const activations = await getAllActivations();

  // Transform Payload data to match AllActivations component expectations
  const transformedActivations: ActivationInterface[] = activations.map(
    (activation) => {
      const coverImage =
        typeof activation.coverImage === "object" && activation.coverImage
          ? activation.coverImage
          : null;

      const city =
        typeof activation.city === "object" && activation.city
          ? activation.city
          : null;

      return {
        title: activation.title,
        year: activation.year,
        slug: activation.slug,
        city: city ? { name: city.name } : { name: "" },
        coverImage: {
          url: coverImage?.sizes?.["card"]?.url || coverImage?.url || "",
          sys: { id: String(activation.id) },
          title: activation.title,
          description: "",
          width: coverImage?.width || 800,
          height: coverImage?.height || 600,
        },
        content: {
          json: {} as any,
        },
      };
    },
  );

  return <AllActivations activations={transformedActivations} />;
}
