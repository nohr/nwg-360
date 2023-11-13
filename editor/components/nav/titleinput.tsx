import React from "react";
import { AnimatePresence, AnimationProps, motion } from "framer-motion";
import { CheckProjectChange } from "@/common/utlis/projectTools";
import { working_copy } from "@/common/state";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useSnapshot } from "valtio";

export default function TitleInput({
  animation,
  titleInputConfig,
  onSubmit,
  onFocus,
  onBlur,
  onChange,
  onClick,
}: TitleInputProps & { animation: AnimationProps }) {
  const { project, images, currentIndex, dimensions, isChanged, history } =
    useSnapshot(working_copy);

  return (
    <AnimatePresence>
      {!titleInputConfig.hidden ? (
        <motion.form
          {...animation}
          onSubmit={onSubmit}
          className="flex flex-row items-center justify-center gap-x-4 self-center"
        >
          <input
            id="title"
            autoFocus
            type="text"
            onFocus={onFocus}
            onBlur={onBlur}
            defaultValue={project?.title || titleInputConfig.value}
            placeholder={titleInputConfig.value}
            className="rounded-3xl bg-slate-400/50 px-3 py-0 text-center font-bold text-black  outline-none transition-all duration-150 ease-linear selection:bg-black selection:text-white focus:outline-[1px] focus:outline-offset-1 focus:outline-current dark:bg-slate-800/50 dark:selection:bg-white dark:selection:text-black hover:dark:text-white focus:dark:outline-current"
            onChange={onChange}
          />
          {/* <IoReturnDownBackSharp
            className=" h-2 w-2 absolute right-0"
            onClick={onClick}
          /> */}
        </motion.form>
      ) : (
        <motion.p
          {...animation}
          className="w-fit cursor-text text-xs font-bold text-current transition-all duration-150 ease-linear hover:text-black hover:underline hover:dark:text-white "
          onClick={onClick}
        >
          {` ${
            project?.title
              ? (CheckProjectChange() ? "*" : "") + project.title
              : "start a new project"
          } ${
            project?.images && project.images.length > 0
              ? ` - ${currentIndex + 1}/${project?.images.length}`
              : ""
          }${
            project?.dateModified ? ` - last save: ${project.dateModified}` : ""
          }`}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
