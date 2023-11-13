"use client";

import React, { ChangeEvent } from "react";
import { IoArrowRedoSharp, IoArrowUndoSharp } from "react-icons/io5";
import { v4 as uuid } from "uuid";
import NavButton from "./navbutton";
import TitleInput from "./titleinput";
import {
  CheckProjectChange,
  handleProjectClose,
  handleProjectExport,
  handleProjectSave,
} from "@/common/utlis/projectTools";
import { state, working_copy } from "@/common/state";
import { useSnapshot } from "valtio";
import OpenRecentModal from "../modal/OpenRecentModal";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "../modal";
import { updateStatus } from "@/common/utlis/editorTools";
import { usePathname } from "next/navigation";

export default function Nav() {
  const { showNav, titleInputConfig, confirm } = useSnapshot(state);
  const pathname = usePathname();
  const { project, history } = useSnapshot(working_copy);

  return (
    <>
      <AnimatePresence>
        {showNav && !pathname.includes("docs") ? (
          <motion.nav
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="fixed top-0 z-30 !m-0 grid h-12 w-full grid-cols-3 grid-rows-[-webkit-min-content] items-center border-b-[1px] border-b-slate-200/50 bg-slate-300/50 px-12 py-2 shadow-xl backdrop-blur-sm transition-all duration-150 ease-linear dark:border-b-slate-700/50 dark:bg-slate-800/50 [&_*_button:hover]:underline"
          >
            {/* new/open/save */}
            <div className="flex flex-row items-center justify-start gap-x-4">
              <NavButton
                title="new"
                disabled={typeof project?.title === "string"}
                onClick={() => {
                  state.titleInputConfig = { hidden: false, value: "untitled" };
                }}
              />
              <NavButton
                title="open"
                onClick={() => {
                  // const input = document.getElementById("files") as HTMLInputElement;
                  // input.click();
                  state.openRecentModal = !state.openRecentModal;
                }}
              />
              <OpenRecentModal />
              <NavButton
                title="save"
                // disabled={
                //   !working_copy.project ||
                //   working_copy.project?.uuid === working_copy.uuid
                // }
                onClick={() => {
                  handleProjectSave();
                  if (!project?.title)
                    state.titleInputConfig = {
                      hidden: false,
                      value: "untitled",
                    };
                }}
              />
            </div>

            {/* title */}
            <div className="flex flex-row items-center justify-center gap-x-4">
              <TitleInput
                animation={{
                  initial: { y: 10 },
                  animate: { opacity: 1, y: 0 },
                  exit: { y: -10 },
                }}
                titleInputConfig={titleInputConfig}
                onSubmit={(e) => {
                  handleProjectSave(e);
                  state.titleInputConfig = { hidden: true, value: "" };
                }}
                onFocus={(e) => {
                  e.currentTarget.select();
                }}
                onBlur={() =>
                  (state.titleInputConfig = {
                    ...titleInputConfig,
                    hidden: true,
                  })
                }
                onChange={(e: ChangeEvent) =>
                  (state.titleInputConfig = {
                    ...titleInputConfig,
                    value: (e.target as HTMLInputElement).value,
                  })
                }
                onClick={() =>
                  (state.titleInputConfig = {
                    ...titleInputConfig,
                    hidden: false,
                  })
                }
              />
            </div>

            {/*close/export/undo/redo */}
            <div className="flex flex-row items-center justify-end gap-x-4">
              <NavButton
                title="close"
                onClick={() => (state.confirm = true)}
                disabled={project === undefined}
              />
              <NavButton
                title="export"
                onClick={handleProjectExport}
                disabled={project === undefined}
              />
              <NavButton
                disabled={history?.undo.length === 0}
                title="undo"
                onClick={() => {
                  updateStatus("undo broken");
                }}
              >
                <IoArrowUndoSharp className="h-6 w-6" />
              </NavButton>
              <NavButton
                disabled={history?.redo.length === 0}
                title="redo"
                onClick={() => {
                  updateStatus("redo broken");
                }}
              >
                <IoArrowRedoSharp className="h-6 w-6" />
              </NavButton>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      <Modal
        bool={confirm}
        overlayClick={() => (state.confirm = false)}
        location="top-1/2 left-1/2 !-translate-x-1/2 !-translate-y-1/2"
      >
        <h2 className="pb-4 pt-0 text-center text-3xl font-thin text-current">
          Are you sure?
        </h2>
        <div className="flex flex-row items-center justify-center gap-x-4">
          <NavButton
            title="close"
            onClick={() => {
              handleProjectClose();
              state.confirm = false;
            }}
            className="rounded-full border-[1px] border-red-600 px-4 py-2 font-extrabold uppercase text-red-600 hover:bg-red-600 hover:text-white  hover:!no-underline"
          />
          <NavButton
            title="cancel"
            onClick={() => (state.confirm = false)}
            className="rounded-full border-[1px] border-current px-4 py-2 font-extrabold uppercase hover:border-blue-600 hover:bg-blue-600 hover:text-white hover:!no-underline dark:hover:border-blue-400  dark:hover:bg-blue-400"
          />
        </div>
      </Modal>
    </>
  );
}
