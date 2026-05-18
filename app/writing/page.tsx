import { getAllPosts } from "@/components/writing/posts";
import { WritingLabPage } from "@/components/writing/writing-lab-page";

export default function Writing() {
  const posts = getAllPosts();

  return <WritingLabPage posts={posts} />;
}
