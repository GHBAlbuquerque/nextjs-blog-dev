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
    h1: "text-2xl/tight font-extrabold md:text-4xl",
    h2: "text-xl/tight font-extrabold md:text-3xl",
  };

  return (
    <Tag className={clsx(headingClassesMap[Tag])}>
      <Link href={url}>{children}</Link>
    </Tag>
  );
}
