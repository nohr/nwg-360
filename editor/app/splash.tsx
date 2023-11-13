"use client";

import { state } from "@/common/state";
import { AnimatePresence, motion } from "framer-motion";
import { PiSpinnerBold } from "react-icons/pi";
import { useSnapshot } from "valtio";

export default function Splash() {
  const { loading } = useSnapshot(state);
  return (
    <AnimatePresence mode="sync">
      {loading ? (
        <motion.div
          id="splash"
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{
            opacity: 0,
            filter: "blur(10px)",
            pointerEvents: "none",
            transition: { delay: 0.75, duration: 0.5, ease: "circOut" },
          }}
          transition={{ duration: 0 }}
          className="!pointer-events-auto fixed z-40 !m-0 flex h-full w-full flex-row items-center justify-center gap-2"
        >
          <PiSpinnerBold className=" h-6 w-6 animate-spin" />
          <h2 className=" text-lg">Loading...</h2>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
