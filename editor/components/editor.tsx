"use client";

import { state, working_copy } from "@/common/state";
import { useSnapshot } from "valtio";
import Timeline from "./panel/timeline";
import Toolbar from "./panel/toolbar";
import Info from "./panel/info";
import { useEffect } from "react";
import Canvas from "./canvas";

export default function Editor() {
  const { images, currentIndex, frames, dimensions } =
    useSnapshot(working_copy);
  const { scale, tool } = useSnapshot(state);

  useEffect(() => {
    document.addEventListener("gesturestart", (e) => e.preventDefault());
    document.addEventListener("gesturechange", (e) => e.preventDefault());
  }, []);

  return (
    <>
      <Timeline />
      <div
        className={` ${frames.length > 0 ? "flex" : "hidden"} ${
          frames.length > 0 && images.length === 0 && "!h-full"
        } relative h-fit w-auto flex-row items-center overflow-hidden rounded-3xl bg-transparent shadow-xl transition-all duration-150 ease-linear`}
      >
        <Toolbar />
        <Info />
        <Canvas />
      </div>
    </>
  );
}
