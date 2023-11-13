import { state, working_copy } from "@/common/state";
import { RefObject, useEffect } from "react";
import { useSnapshot } from "valtio";
import { v4 as uuid } from "uuid";
import {
  Canvas as FCanvas,
  FabricObject,
  FabricObjectProps,
  ObjectEvents,
  SerializedObjectProps,
  TEvent,
  TPointerEvent,
  TPointerEventInfo,
} from "fabric/*";

export default function useTools(
  canvasRef: RefObject<FCanvas | null>,
  containerRef: RefObject<HTMLDivElement>,
) {
  const { tool, scale, colors } = useSnapshot(state);
  const { frames, currentIndex, images } = useSnapshot(working_copy);
  const maxScale = 2.5;

  useEffect(() => {
    if (!canvasRef.current) return;
    // function handleContextMenu(e: TPointerEventInfo) {
    //   // e.preventDefault();
    //   console.log("handle context menu: ", e);
    // }
    function handleMouseDown(e: TPointerEventInfo<TPointerEvent>) {
      e.e.preventDefault();
      // console.log(e);
      //   if (
      //     // @ts-ignore
      //     !state.selected.includes(e.target.parentNode.id) &&
      //     // !e.shiftKey &&
      //     state.tool !== "zoom"
      //   )
      //     state.selected = [];

      //   if (
      //     (state.tool === "select" &&
      //       // @ts-ignore
      //       !state.selected.includes(e.target.parentNode.id)) ||
      //     state.tool === "add_unit"
      //   ) {
      //   }
      // }
    }

    function handleMouseUp(e: TPointerEventInfo<TPointerEvent>) {
      e.e.preventDefault();
      if (tool === "zoom") {
        state.tool = "select";
        state.zoom = false;
      }
    }

    function handleMouseMove(e: TPointerEventInfo<TPointerEvent>) {
      const container = containerRef.current;
      if (e.e instanceof TouchEvent) return;
      if (tool === "zoom") {
        if (container)
          container.style.transformOrigin = `${e.e.clientX - 48}px ${
            e.e.clientY - 136
          }px`;
      }
    }

    function handleWheel(e: TPointerEventInfo<WheelEvent>) {
      e.e.preventDefault();
      const canvas = canvasRef.current;

      if (tool === "zoom")
        if (e.e.ctrlKey && canvas) {
          let delta = e.e.deltaY * 0.005;
          delta = parseFloat(delta.toPrecision(3));

          if (scale - delta < maxScale) state.scale = scale - delta;
          else {
            state.scale = maxScale;
            return;
          }
          if (scale - delta > 1) state.scale = scale - delta;
          else state.scale = 1;
        }
    }

    function handleSelection(
      e: Partial<TEvent<TPointerEvent>> & {
        selected: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
      },
    ) {
      console.log("handle selection: ", e);
    }

    function handleSelectionCleared(
      e: Partial<TEvent<TPointerEvent>> & {
        deselected: FabricObject<
          Partial<FabricObjectProps>,
          SerializedObjectProps,
          ObjectEvents
        >[];
      },
    ) {
      console.log("handle selection cleared: ", e);
    }
    const canvas = canvasRef.current;

    canvasRef.current.on({
      "mouse:down": handleMouseDown,
      "mouse:up": handleMouseUp,
      "mouse:move": handleMouseMove,
      "mouse:wheel": handleWheel,
      "selection:created": handleSelection,
      "selection:updated": handleSelection,
      "selection:cleared": handleSelectionCleared,
    });

    return () => {
      canvas.off({
        "mouse:down": handleMouseDown,
        "mouse:up": handleMouseUp,
        "mouse:move": handleMouseMove,
        "mouse:wheel": handleWheel,
        "selection:updated": handleSelection,
        "selection:created": handleSelection,
        "selection:cleared": handleSelectionCleared,
      });
    };
  }, [canvasRef, containerRef, tool, scale, images, frames, currentIndex]);
}

export const getBoundsColor = (bool = true) => {
  return bool
    ? state.tool === "select"
      ? state.colors.selected.select
      : state.tool === "skew"
      ? state.colors.selected.skew
      : state.tool === "add_unit"
      ? state.colors.selected.add_unit
      : "#ffffff99"
    : state.colors.unit.hidden;
};

// todo function that toggles edits made to one frame vs all frames
