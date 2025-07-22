"use client";

import clsx from "clsx";
import { CircleXIcon, FileTextIcon, HomeIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const navClasses = clsx(
    "bg-slate-900",
    "text-slate-100",
    "rounded-lg",
    "flex",
    "flex-col",
    "mb-8",
    !isOpen && "h-10",
    !isOpen && "overflow-hidden",
    "sm:flex-row",
    "sm-flex-wrap",
    "sm:overflow-visible",
    "sm:h-auto"
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
    "shrink-0",
    "cursor-pointer"
  );

    const openClosedBtnClasses = clsx(
    linkClasses, 'text-blue-200', "italic", "sm:hidden"
  );

  return (
    <>
      <nav className={navClasses}>
        <button className={openClosedBtnClasses}
        onClick={() => setIsOpen(!isOpen)}>
          {!isOpen && (
            <>
              <MenuIcon />
              Menu
            </>
          )}

        {isOpen && (
            <>
              <CircleXIcon />
              Menu
            </>
          )}
        </button>

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
