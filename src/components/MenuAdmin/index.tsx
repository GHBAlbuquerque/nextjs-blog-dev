"use client";

import { logoutAction } from "@/actions/login/logout-action";
import clsx from "clsx";
import { log } from "console";
import { is } from "drizzle-orm";
import {
  CircleXIcon,
  FileTextIcon,
  HomeIcon,
  HourglassIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export default function MenuAdmin() {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsOpen(false);
  }, [pathName]);

  function handleLogout(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void {
    event.preventDefault();
    startTransition(async () => {
      await logoutAction();
    });
  }

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
    linkClasses,
    "text-blue-200",
    "italic",
    "sm:hidden"
  );

  return (
    <>
      <nav className={navClasses}>
        <button
          className={openClosedBtnClasses}
          onClick={() => setIsOpen(!isOpen)}
        >
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

        <Link className={linkClasses} href="/admin/posts/new">
          <PlusIcon />
          Create
        </Link>

        <Link
          className={linkClasses}
          href="/admin/posts/new"
          onClick={handleLogout}
        >
          {isPending && (
            <>
              <HourglassIcon />
              Logging out...
            </>
          )}
          {!isPending && (
            <>
              <LogOutIcon />
              Logout
            </>
          )}
        </Link>
      </nav>
    </>
  );
}
