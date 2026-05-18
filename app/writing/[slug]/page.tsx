import { notFound } from "next/navigation";
import { FocusReader } from "@/components/writing/focus-reader";
import { getAllPosts, getPostBySlug } from "@/components/writing/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug
  }));
}

export default async function WritingPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <FocusReader post={post} />;
}
