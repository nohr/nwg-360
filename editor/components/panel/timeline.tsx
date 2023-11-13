import useDrag from "@/hooks/useDrag";
import { useRef } from "react";
import { default as NextImage } from "next/image";
import { motion, useScroll } from "framer-motion";
import { working_copy } from "@/common/state";
import { useSnapshot } from "valtio";
import { useTimelineResize } from "@/hooks/useTimelineResize";

export default function Timeline() {
  const { images, currentIndex, dimensions, frames } =
    useSnapshot(working_copy);
  const timelineRef = useRef<HTMLDivElement>(null);
  useDrag(timelineRef);
  const { timelineHeight, resizeRef } = useTimelineResize(timelineRef);

  const { scrollXProgress, scrollYProgress } = useScroll({
    container: timelineRef,
  });

  scrollXProgress.on("change", (latest) => {
    working_copy.currentIndex = (latest * (working_copy.frames.length - 1)) | 0;
  });

  function Playhead() {
    return (
      <div
        className={`pointer-events-none absolute left-1/2 top-0 z-20 flex h-full w-0 -translate-x-1/2 transform  
                cursor-grab select-none items-center justify-center border-2 border-current text-red-500 transition-all duration-150
              ease-linear active:cursor-grabbing group-hover:border-current group-active:border-current `}
      >
        <span className=" absolute -top-5 text-sm font-bold drop-shadow-sm">
          {currentIndex + 1}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`${
        frames.length === 0 ? "hidden" : "flex"
      } group relative h-8 w-full justify-center transition-all duration-150 ease-linear`}
      style={{ height: `${timelineHeight}px` }}
    >
      <div
        // ref={resizeRef}
        id="resizeTimeline"
        className=" absolute top-0 z-10 mb-3 h-[1px] w-[calc(100%_-_3rem)] cursor-row-resize rounded-3xl bg-slate-200/50 px-6 transition-all duration-150 ease-linear hover:scale-y-[800%] hover:text-blue-500/50 active:h-1 active:scale-y-[200%] active:text-blue-500 active:duration-0 dark:bg-slate-700/50"
      />
      <Playhead />
      <motion.div
        id="timeline"
        ref={timelineRef}
        className="scrollbar-hide flex h-full w-full cursor-grab flex-row flex-nowrap overflow-x-scroll rounded-3xl border-[1px] border-slate-200/50 bg-slate-300/50 shadow-xl transition-all duration-150 ease-linear active:cursor-grabbing dark:border-slate-700/50 dark:bg-slate-800/50"
      >
        {frames.length > 0 &&
          frames.map((_, i) => (
            <NextImage
              src={images[i] || "/placeholder.jpg"}
              key={`${i}`}
              alt="img"
              tabIndex={0}
              width={dimensions.width}
              height={dimensions.height}
              className="pointer-events-none relative h-full w-full select-none object-contain first-of-type:ml-[calc(50%)] last-of-type:mr-[calc(50%)]"
              style={{
                aspectRatio: `${dimensions.width}/${dimensions.height}`,
              }}
              quality={10}
            />
          ))}
      </motion.div>
    </div>
  );
}
