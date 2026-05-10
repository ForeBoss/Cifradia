import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { staticPages } from "@/generated/static-pages";

export const metadata: Metadata = {
  title: { absolute: staticPages.home.title },
  description: staticPages.home.description,
  alternates: { canonical: "/" },
};

export default function Home() {
  return <LegacyPage pageKey="home" />;
}
