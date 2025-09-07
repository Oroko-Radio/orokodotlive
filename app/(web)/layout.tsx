import type { Metadata, Viewport } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import SocialSection from "@/components/SocialSection";
import { MixcloudPlayer } from "@/components/ClientComponents";
import LivePlayerWithData from "@/components/LivePlayerWithData";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const metadata: Metadata = {
  title: {
    default: "Oroko",
    template: "Oroko | %s",
  },
  description:
    "Oroko is a not-for-profit independent internet radio station based in Accra, Ghana. We aim to connect, inspire and empower through conversation, collaboration and community.",
  openGraph: {
    title: "Oroko Radio",
    siteName: "Oroko Radio",
    description:
      "Oroko is a not-for-profit independent internet radio station based in Accra, Ghana. We aim to connect, inspire and empower through conversation, collaboration and community.",
    url: "https://oroko.live/",
    type: "website",
    images: [
      {
        url: "https://oroko.live/OROKO_OG_1200px.png",
        secureUrl: "https://oroko.live/OROKO_OG_1200px.png",
        width: 1200,
        height: 627,
        type: "image/png",
        alt: "Oroko Radio Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
        <LivePlayerWithData />

        {children}

        <MixcloudPlayer />

        <SocialSection className="hidden lg:flex fixed bottom-4 right-8" />
        <Footer />

        <Analytics />
      </body>
    </html>
  );
}
