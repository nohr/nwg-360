import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function Modal({
  bool,
  overlayClick,
  children,
  className = "",
  location = "",
}: {
  bool: boolean;
  overlayClick: () => void;
  children: React.ReactNode;
  className?: string;
  location?: string;
}) {
  return (
    <AnimatePresence>
      {bool && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`${location} ${className} 
            absolute z-50 flex h-fit w-[31%] flex-col items-center rounded-3xl border-[1px] border-slate-200/50 bg-slate-300/50 p-4 shadow-xl peer-hover/overlay:opacity-25 dark:border-slate-700/50 dark:bg-slate-800/50`}
          >
            {children}
          </motion.div>
          <div
            id="overlay"
            className=" peer/overlay fixed left-0 top-0 z-[45] h-screen w-screen cursor-pointer opacity-90"
            onClick={overlayClick}
          />
        </>
      )}
    </AnimatePresence>
  );
}

export default Modal;
