import React, { ReactNode } from "react";

export default function TitleBox({ children }: { children: ReactNode }) {
  return (
    <section className="relative border-black border-2 mb-6 pb-6 md:py-6 lg:pb-10">
      {children}
    </section>
  );
}
