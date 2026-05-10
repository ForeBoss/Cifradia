import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { staticPages } from "@/generated/static-pages";

export const metadata: Metadata = {
  title: "Blog",
  description: staticPages.blog.description,
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return <LegacyPage pageKey="blog" />;
}