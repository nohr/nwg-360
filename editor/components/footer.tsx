"use client";

import { state } from "@/common/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub } from "react-icons/si";
import { useSnapshot } from "valtio";

export default function Footer() {
  const { status } = useSnapshot(state);
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 z-50 mx-4 flex h-8 w-[stretch] flex-row items-center justify-between gap-6 pb-1 md:mx-12">
      <p className="text-base ">{status}</p>
      <div className="flex flex-row gap-6">
        {!pathname.includes("docs") ? (
          <Link
            href="/docs"
            className="text-xs font-bold uppercase hover:animate-pulse hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            Docs
          </Link>
        ) : (
          <Link
            href="/"
            className="text-xs font-bold uppercase hover:animate-pulse hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-400 dark:focus:text-blue-400"
          >
            Editor
          </Link>
        )}
        <a
          href="https://github.com/nohr/tour-360"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row items-center justify-center gap-2 hover:animate-pulse hover:text-blue-600 focus:text-blue-600 dark:hover:text-blue-400 dark:focus:text-blue-400"
        >
          <SiGithub className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
