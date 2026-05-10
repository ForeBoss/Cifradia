import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { staticPages } from "@/generated/static-pages";

export const metadata: Metadata = {
  title: "Contacto",
  description: staticPages.contact.description,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <LegacyPage pageKey="contact" />;
}