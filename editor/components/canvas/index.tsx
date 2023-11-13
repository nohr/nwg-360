declare global {
  interface Window {
    canvas: FCanvas | undefined;
  }
}

import { state, working_copy } from "@/common/state";
import { Canvas as FCanvas, FabricImage, Textbox, util } from "fabric";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import { useSnapshot } from "valtio/react";
import ImageLayers from "./image_layers";
import useTools from "@/hooks/useTools";
import renderUnits from "./renderUnits";
import { motion } from "framer-motion";

const DEV_MODE = process.env.NODE_ENV === "development";

export function useCanvas(
  ref?: React.ForwardedRef<HTMLCanvasElement>,
  init?: (canvas: FCanvas) => any,
  saveState = false,
  deps: any[] = [],
) {
  const elementRef = useRef<HTMLCanvasElement>(null);
  const fc = useRef<FCanvas | null>(null);
  const data = useRef<any>(null);
  const { dimensions } = useSnapshot(working_copy);

  const setRef = useCallback(
    (el: HTMLCanvasElement | null) => {
      //@ts-ignore
      elementRef.current = el;
      if (ref && typeof ref !== "function") ref.current = elementRef.current;
      // save state
      if (DEV_MODE && saveState && fc.current) {
        data.current = fc.current.toJSON();
      }
      // dispose canvas
      fc.current?.dispose();
      // set/clear ref
      if (!el) {
        fc.current = null;
        return;
      }
      const canvas = new FCanvas(el, {
        fireRightClick: true,
      });
      window.canvas = fc.current = canvas;
      // invoke callback
      init && init(canvas);
      // restore state
      if (DEV_MODE && saveState && data.current) {
        canvas.loadFromJSON(data.current);
      }
    },
    [init, ref, saveState],
  );
  useEffect(() => {
    // disposer
    return () => {
      // save state
      if (DEV_MODE && saveState && fc.current) {
        data.current = fc.current.toJSON();
      }
      // we avoid unwanted disposing by doing so only if element ref is unavailable
      if (!elementRef.current) {
        fc.current?.dispose();
        fc.current = null;
      }
    };
  }, [saveState]);
  return [fc, setRef] as [typeof fc, typeof setRef];
}

const CanvasComponent = forwardRef<
  HTMLCanvasElement,
  {
    onLoad?: (canvas: FCanvas) => any;
    saveState?: boolean;
  }
>(({ onLoad, saveState }, ref) => {
  const [canvasRef, setCanvasElRef] = useCanvas(ref, onLoad, saveState);
  const containerRef = useRef<HTMLDivElement>(null!);
  const { images, currentIndex, frames, dimensions } =
    useSnapshot(working_copy);
  const { scale } = useSnapshot(state);

  useTools(canvasRef, containerRef);

  return (
    <motion.div
      ref={containerRef}
      style={{ scale }}
      className="relative left-0 top-0 h-full w-full"
    >
      <canvas
        style={{ aspectRatio: `${dimensions.width}/${dimensions.height}` }}
        className="relative z-0 !h-auto !w-full"
        ref={setCanvasElRef}
      />
      <ImageLayers />
    </motion.div>
  );
});

CanvasComponent.displayName = "CanvasComponent";

function resizeCanvas(canvas: FCanvas, dimensions: Dimensions) {
  canvas.setDimensions({ ...dimensions });
  canvas.wrapperEl.style.aspectRatio = `${dimensions.width}/${dimensions.height}`;
  canvas.wrapperEl.style.width = "100%";
  canvas.wrapperEl.style.height = "auto";
}
const Canvas = () => {
  const { images, currentIndex, frames, dimensions } =
    useSnapshot(working_copy);
  const { tool } = useSnapshot(state);

  const onLoad = useCallback(
    async (canvas: FCanvas) => {
      resizeCanvas(canvas, dimensions);
      renderUnits(canvas, working_copy.frames, currentIndex);
    },
    [dimensions, currentIndex, tool],
  );

  return <CanvasComponent onLoad={onLoad} />;
};
export default Canvas;
