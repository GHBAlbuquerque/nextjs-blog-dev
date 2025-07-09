import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: SafeMarkdownProps) {
  return (
    <div
      className={clsx(
        "prose prose-slate",
        "w-full",
        "max-w-none",
        "overflow-hidden",
        "prose-a:text-blue-500",
        "prose-a:hover:text-blue-700",
        "dark:prose-h1:text-slate-200",
        "dark:prose-h2:text-slate-200",
        "dark:prose-code:text-slate-300",
        "dark:prose-strong:text-slate-300",
        "dark:text-slate-200",
        "prose-img:mx-auto",
        "lg:prose-lg"
      )}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
