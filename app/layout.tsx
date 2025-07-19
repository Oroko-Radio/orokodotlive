import type { Metadata } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import SocialSection from "../components/SocialSection";
import { MixcloudPlayer, LivePlayer } from "../components/ClientComponents";

export const metadata: Metadata = {
  title: "OROKO RADIO",
  description: "Community radio in Accra, Ghana",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <LivePlayer />

        {children}

        <MixcloudPlayer />

        <SocialSection className="hidden lg:flex fixed bottom-4 right-8" />
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
