"use client";

import { Fragment, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy } from "lucide-react";

type Block =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; code: string; language: string };

export function MarkdownContent({ content }: { content: string }) {
  const blocks = parseMarkdown(content);

  return (
    <div className="max-w-none text-[17px] leading-8 text-muted sm:text-lg">
      {blocks.map((block, index) => (
        <Fragment key={index}>{renderBlock(block)}</Fragment>
      ))}
    </div>
  );
}

function renderBlock(block: Block) {
  if (block.type === "heading") {
    return block.level === 2 ? (
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4 mt-10 text-2xl font-semibold leading-tight text-ink sm:text-3xl"
      >
        {block.text}
      </motion.h2>
    ) : (
      <motion.h3
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mb-3 mt-8 text-xl font-semibold leading-tight text-ink"
      >
        {block.text}
      </motion.h3>
    );
  }

  if (block.type === "list") {
    return (
      <motion.ul
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="my-5 space-y-2 pl-5"
      >
        {block.items.map((item) => (
          <li key={item} className="list-disc pl-2 text-muted">
            {item}
          </li>
        ))}
      </motion.ul>
    );
  }

  if (block.type === "code") {
    return <CodeBlock code={block.code} language={block.language} />;
  }

  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="my-5 leading-8 text-muted"
    >
      {renderInlineCode(block.text)}
    </motion.p>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);
  const lines = code.split("\n");

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="my-7 overflow-hidden rounded-[8px] border border-slate-700/80 bg-[#111827] shadow-soft dark:shadow-soft-dark"
    >
      <div className="flex items-center justify-between border-b border-slate-700/80 bg-[#0f172a] px-4 py-2">
        <span className="text-xs uppercase tracking-[0.14em] text-slate-400">{language || "code"}</span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-accent/60 hover:text-white"
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto p-0 text-sm leading-6 text-slate-200">
        <code className="block min-w-full py-4">
          {lines.map((line, index) => (
            <span key={`${index}-${line}`} className="group block whitespace-pre px-4 hover:bg-white/5">
              <span className="mr-5 inline-block w-8 select-none text-right text-slate-600">{index + 1}</span>
              <span>{line || " "}</span>
              {"\n"}
            </span>
          ))}
        </code>
      </pre>
    </motion.div>
  );
}

function renderInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={index} className="rounded bg-accentSoft/60 px-1.5 py-0.5 text-[0.9em] text-ink">
          {part.slice(1, -1)}
        </code>
      );
    }

    return <Fragment key={index}>{part}</Fragment>;
  });
}

function parseMarkdown(content: string): Block[] {
  const lines = content.split(/\r?\n/);
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.replace(/^```/, "").trim();
      const code: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index].startsWith("```")) {
        code.push(lines[index]);
        index += 1;
      }
      blocks.push({ type: "code", code: code.join("\n"), language });
      index += 1;
      continue;
    }

    if (line.startsWith("### ")) {
      blocks.push({ type: "heading", level: 3, text: line.replace(/^### /, "") });
      index += 1;
      continue;
    }

    if (line.startsWith("## ")) {
      blocks.push({ type: "heading", level: 2, text: line.replace(/^## /, "") });
      index += 1;
      continue;
    }

    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].replace(/^- /, ""));
        index += 1;
      }
      blocks.push({ type: "list", items });
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith("## ") &&
      !lines[index].startsWith("### ") &&
      !lines[index].startsWith("- ") &&
      !lines[index].startsWith("```")
    ) {
      paragraph.push(lines[index].trim());
      index += 1;
    }
    blocks.push({ type: "paragraph", text: paragraph.join(" ") });
  }

  return blocks;
}
