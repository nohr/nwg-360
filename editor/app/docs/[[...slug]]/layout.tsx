"use client";

import { state } from "@/common/state";
import { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/panel/sidebar";

function DocsLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    state.loading = false;
    return () => {
      state.loading = true;
    };
  }, []);

  return (
    <>
      <Sidebar />
      <motion.main className=" flex h-full w-auto flex-col items-start justify-start gap-6">
        {children}
      </motion.main>
    </>
  );
}

export default DocsLayout;
