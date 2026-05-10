import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { BlogPostView } from "@/components/blog-post-view";
import { blogPosts, type BlogSlug } from "@/generated/blog-data";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function isBlogSlug(slug: string): slug is BlogSlug {
  return Object.prototype.hasOwnProperty.call(blogPosts, slug);
}

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!isBlogSlug(slug)) {
    return {
      title: "Artículo no encontrado",
      description: "Artículo del blog de Cifradia sobre decisiones de tecnología, operación, nube, seguridad, datos y automatización.",
    };
  }

  const post = blogPosts[slug];

  return {
    title: post.title,
    description: post.lead,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.lead,
      type: "article",
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  if (!isBlogSlug(slug)) {
    notFound();
  }

  return (
    <>
      <BlogPostView slug={slug} />
      <Script id="blog-post-wa" src="/assets/js/wa-widget.js" strategy="afterInteractive" />
    </>
  );
}