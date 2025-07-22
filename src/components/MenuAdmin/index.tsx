import clsx from "clsx";
import { FileTextIcon, HomeIcon } from "lucide-react";
import Link from "next/link";

export default function MenuAdmin() {
  const navClasses = clsx(
    "bg-slate-900",
    "text-slate-100",
    "rounded-lg",
    "flex",
    "flex-col",
    "mb-8",
    "sm:flex-row",
    "sm-flex-wrap",
    "overflow-hidden"
  );
  const linkClasses = clsx(
    "[&>svg]:w-[16px]",
    "[&>svg]:h-[16px]",
    "px-4",
    "flex",
    "transition",
    "hover:bg-slate-800",
    "items-center",
    "justify-start",
    "gap-2",
    "h-10",
    "shrink-0"
  );

  return (
    <>
      <nav className={navClasses}>
        <a className={linkClasses} href="/" target="_blank">
          <HomeIcon />
          Home
        </a>

        <Link className={linkClasses} href="/admin/posts">
          <FileTextIcon />
          Posts
        </Link>
      </nav>
    </>
  );
}
