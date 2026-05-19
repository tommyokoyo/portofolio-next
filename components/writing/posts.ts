import { rawWritingPosts } from "@/content/posts";

export type LabPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  draft: boolean;
  content: string;
  preview: string;
};

export function getAllPosts(): LabPost[] {
  return rawWritingPosts
    .map(({ slug, raw }) => createPost(slug, raw))
    .filter((post) => !post.draft)
    .map((post) => ({
      ...post,
      preview: createPreview(post.content)
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug) ?? null;
}

function createPreview(content: string) {
  return content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#") && !line.startsWith("```"))
    .slice(0, 3)
    .join(" ");
}

function createPost(slug: string, raw: string): Omit<LabPost, "preview"> {
  const { frontmatter, content } = parseFrontmatter(raw);

  return {
    slug,
    title: frontmatter.title ?? slug,
    description: frontmatter.description ?? "",
    date: frontmatter.date ?? "",
    tags: parseTags(frontmatter.tags),
    draft: frontmatter.draft === "true",
    content
  };
}

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    return { frontmatter: {} as Record<string, string>, content: raw.trim() };
  }

  const frontmatter = match[1].split(/\r?\n/).reduce<Record<string, string>>((acc, line) => {
    const separator = line.indexOf(":");
    if (separator === -1) {
      return acc;
    }

    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^"|"$/g, "");
    acc[key] = value;
    return acc;
  }, {});

  return { frontmatter, content: match[2].trim() };
}

function parseTags(value = "") {
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((tag) => tag.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
}
