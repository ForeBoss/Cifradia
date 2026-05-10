import { redirect } from "next/navigation";

type LegacyBlogPostPageProps = {
  searchParams: Promise<{ slug?: string }>;
};

export default async function LegacyBlogPostPage({ searchParams }: LegacyBlogPostPageProps) {
  const { slug } = await searchParams;
  redirect(slug ? `/blog/${slug}` : "/blog");
}