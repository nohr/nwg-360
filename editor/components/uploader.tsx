"use client";

import { state, working_copy } from "@/common/state";
import {
  handleFileUpload,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onKeyUp,
} from "@/common/utlis/fileTools";
import { handleLoadProjectsFromLocalStore } from "@/common/utlis/projectTools";
import { useEffect } from "react";
import { PiUploadSimpleLight } from "react-icons/pi";
import { useSnapshot } from "valtio";
import IntroTool from "./IntroTool";
import { AnimatePresence, motion } from "framer-motion";

export default function Uploader() {
  const { inputText, loading } = useSnapshot(state);
  const { images, project } = useSnapshot(working_copy);

  useEffect(() => {
    state.loading = false;
    handleLoadProjectsFromLocalStore();
    return () => {
      state.loading = true;
    };
  }, []);

  return (
    <div
      className={`${images.length === 0 ? "flex" : "hidden"} ${
        project ? "h-fit" : "h-full"
      } w-full flex-row items-start justify-center gap-4`}
    >
      <AnimatePresence>
        {!project ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="flex h-fit w-1/2 flex-col items-center justify-start gap-4"
          >
            <IntroTool title="Local Projects" />
            <IntroTool title="New Project" />
          </motion.div>
        ) : null}
        <motion.label
          key="uploader"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`${
            project ? "animate-pulse !text-blue-600 dark:!text-blue-400" : ""
          } relative flex h-full w-full cursor-pointer select-none flex-row items-center justify-center gap-4 overflow-hidden rounded-3xl border-[1px] border-current p-4 text-xs font-bold  uppercase tracking-wide text-current shadow-md outline-none transition-all duration-150 ease-linear file:hidden hover:text-blue-600 focus:text-blue-600 disabled:animate-pulse dark:hover:text-blue-400 dark:focus:text-blue-400`}
          htmlFor="files"
          tabIndex={0}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onDragLeave={onDragLeave}
          onKeyUp={onKeyUp}
        >
          <input
            suppressHydrationWarning
            // todo disabled while uploading
            id="files"
            type="file"
            accept="image/*,application/json"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
          <PiUploadSimpleLight className="h-4 w-4" />
          {inputText}
        </motion.label>
      </AnimatePresence>
    </div>
  );
}
