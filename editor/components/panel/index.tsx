import { state } from "@/common/state";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

function Panel({
  children,
  bool,
  className = "",
  animation = {},
}: {
  children: React.ReactNode;
  bool: boolean;
  className?: string;
  animation?: HTMLMotionProps<"div">;
}) {
  return (
    <AnimatePresence>
      {bool ? (
        <motion.div
          {...animation}
          className={
            `${
              state.tool === "zoom" && "!pointer-events-none opacity-20"
            } pointer-events-auto flex h-fit w-fit flex-col items-center justify-center gap-4 rounded-2xl border-[1px] border-slate-200/50 bg-slate-300 p-2 shadow-md transition-all duration-150 ease-linear dark:border-slate-700/50 dark:bg-slate-800 ` +
            className
          }
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Panel;
