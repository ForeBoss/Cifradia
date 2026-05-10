import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { staticPages } from "@/generated/static-pages";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description: staticPages.terms.description,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegacyPage pageKey="terms" />;
}