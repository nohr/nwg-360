import { state, working_copy } from "@/common/state";
import React, { useState } from "react";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";

function Info() {
  const { frames, currentIndex } = useSnapshot(working_copy);
  const { selected, tool } = useSnapshot(state);
  const [value, setValue] = useState<string>("");

  const unit = frames[currentIndex]?.find((unit) => unit.uuid === selected[0]);
  const selectedNumbers = selected.map(
    (uuid) => frames[currentIndex]?.find((unit) => unit.number.uuid === uuid),
  );
  const selectedUnits = selected.map(
    (uuid) => frames[currentIndex]?.find((unit) => unit.uuid === uuid),
  );

  return (
    <AnimatePresence mode="sync">
      <div
        className={`pointer-events-none fixed right-12 top-[4.5rem] z-30 flex h-fit w-fit select-none flex-col items-center gap-4 overflow-auto rounded-lg py-4 pr-4 text-xs`}
      >
        {selectedNumbers.map((unit) => {
          if (!unit) return;
          return (
            <motion.div
              key={`${unit.number.uuid} info`}
              initial={{ right: -50, opacity: 0 }}
              animate={{ right: 65, opacity: 1 }}
              exit={{ right: -50, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`${
                tool === "zoom" && "!pointer-events-none opacity-20"
              } pointer-events-auto flex h-fit w-32 flex-col items-center justify-center overflow-auto rounded-2xl border-[1px] border-slate-200/50 bg-slate-300 p-2 text-xs shadow-md transition-all duration-150 ease-linear dark:border-slate-700/50 dark:bg-slate-800`}
            >
              <p className="text-center text-[0.5rem] font-bold">
                {unit.number.uuid}
              </p>
              <hr className="my-1 h-[1px] w-full border-current" />
              <div className="mt-1 flex h-full w-full flex-row items-center justify-between gap-2">
                <label htmlFor={`number ${unit.number?.uuid}`}>unit #</label>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    //   @ts-ignore
                    const number = e.target.children[0].value;
                    // console.log(number);

                    // add to current and all subsequent frames
                    for (
                      let i = currentIndex;
                      i < working_copy.frames.length;
                      i++
                    ) {
                      const unit = working_copy.frames[i].find(
                        (unit) => unit.number.uuid === selected[0],
                      );
                      if (!unit || !unit.number) continue;
                      unit.number.text = number;
                    }
                    setValue("");
                  }}
                >
                  <input
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    placeholder={unit.number?.text ?? ""}
                    id={`number ${unit.number?.uuid}`}
                    type="text"
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    autoFocus={!unit.number?.text}
                    className="h-4 w-12 appearance-none rounded-lg border-none bg-slate-300 text-center text-xs uppercase outline-none focus:outline-current dark:bg-slate-800"
                  />
                </form>
              </div>
            </motion.div>
          );
        })}
        {selectedUnits.map((unit) => {
          if (!unit) return;
          return (
            <motion.div
              key={unit.uuid}
              initial={{ right: -50, opacity: 0 }}
              animate={{ right: 65, opacity: 1 }}
              exit={{ right: -50, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className={`${
                tool === "zoom" && "!pointer-events-none opacity-20"
              } pointer-events-auto flex h-fit w-32 flex-col items-center justify-center overflow-auto rounded-2xl border-[1px] border-slate-200/50 bg-slate-300 p-2 text-xs shadow-md transition-all duration-150 ease-linear dark:border-slate-700/50 dark:bg-slate-800`}
            >
              <p className="text-center text-[0.5rem] font-bold">{unit.uuid}</p>
              <hr className="my-1 h-[1px] w-full border-current" />
              <div className="mt-4 flex h-full w-full flex-row items-center justify-between gap-2">
                <label htmlFor="visible">
                  {unit.visible ? "" : "not "}visible
                </label>
                <input
                  checked={
                    frames[currentIndex].find(
                      (unit) => unit.uuid === selected[0],
                    )?.visible ?? false
                  }
                  id="visible"
                  type="checkbox"
                  onChange={(e) => {
                    e.preventDefault();
                    const visible = e.target.checked;
                    // add to current and all subsequent frames
                    for (
                      let i = currentIndex;
                      i < working_copy.frames.length;
                      i++
                    ) {
                      const unit = working_copy.frames[i].find(
                        (unit) => unit.uuid === selected[0],
                      );
                      if (!unit || !unit.number) continue;
                      unit.visible = visible;
                    }
                  }}
                  className=" h-4 w-4 cursor-pointer appearance-none rounded-md border-2 border-current text-center text-xs outline-current checked:border-0 checked:bg-current hover:!bg-current hover:!bg-opacity-25 focus:outline-offset-0 focus:outline-current focus-visible:!outline-offset-0 focus-visible:!outline-current"
                />
              </div>
              <div className="mt-4 flex h-full w-full flex-col items-center justify-between gap-1">
                <p className="text-center text-xs">{`delete unit${
                  selectedUnits.length > 1 ? "s" : ""
                }`}</p>
                <div className="flex h-full w-full flex-row items-center justify-evenly">
                  {currentIndex !== 0 &&
                    working_copy.frames[currentIndex - 1].find(
                      (unit) => unit.uuid === selected[0],
                    ) && (
                      <button
                        type="button"
                        title="delete all occurrences of this unit before this frame"
                        onClick={() => {
                          for (let i = 0; i < currentIndex; i++) {
                            const unit = working_copy.frames[i].find(
                              (unit) => unit.uuid === selected[0],
                            );
                            if (!unit) continue;
                            working_copy.frames[i] = working_copy.frames[
                              i
                            ].filter((unit) => unit.uuid !== selected[0]);
                          }
                        }}
                        className=" appearance-none rounded-lg border-2 border-current px-2 text-xs font-bold hover:border-red-500 hover:text-red-500 focus:outline-none focus-visible:!outline-none"
                      >
                        {`<${currentIndex}`}
                      </button>
                    )}
                  {currentIndex !== frames.length - 1 &&
                    working_copy.frames[currentIndex + 1].find(
                      (unit) => unit.uuid === selected[0],
                    ) && (
                      <button
                        type="button"
                        title="delete all occurrences of this unit after (& including) this frame"
                        onClick={() => {
                          for (
                            let i = currentIndex;
                            i < working_copy.frames.length;
                            i++
                          ) {
                            const unit = working_copy.frames[i].find(
                              (unit) => unit.uuid === selected[0],
                            );
                            if (!unit) continue;
                            working_copy.frames[i] = working_copy.frames[
                              i
                            ].filter((unit) => unit.uuid !== selected[0]);
                          }
                        }}
                        className="appearance-none rounded-lg border-2 border-current px-2 text-xs font-bold hover:border-red-500 hover:text-red-500 focus:outline-none focus-visible:!outline-none"
                      >
                        {`${currentIndex + 1}>`}
                      </button>
                    )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </AnimatePresence>
  );
}

export default Info;
