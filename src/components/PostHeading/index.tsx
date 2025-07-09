import clsx from "clsx";
import Link from "next/link";

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: "h1" | "h2";
};

export default function PostHeading({
  children,
  url,
  as: Tag = "h2",
}: PostHeadingProps) {
  const headingClassesMap = {
    h1: "text-2xl/tight font-extrabold md:text-4xl text-left group-hover:text-slate-600 transition",
    h2: "text-lg/tight font-bold md:text-2xl text-left group-hover:text-slate-600 transition",
  };

  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
