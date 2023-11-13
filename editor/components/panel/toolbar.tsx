import { state } from "@/common/state";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import { PiCursor, PiPerspective } from "react-icons/pi";
import {
  MdOutlineDomainAdd,
  MdOutlineSwapHorizontalCircle,
  MdSwapHorizontalCircle,
} from "react-icons/md";
import { IoShapesOutline, IoShapes } from "react-icons/io5";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { TbZoomPan } from "react-icons/tb";
import Panel from ".";

export default function Toolbar() {
  const { showHiddenShapeLayers, showToolbar, tool } = useSnapshot(state);
  return (
    <>
      <Panel
        bool={showToolbar}
        className={`${showToolbar ? "justify-between" : "justify-end"} ${
          tool === "zoom" ? "opacity-20" : ""
        } pointer-events-none absolute left-4 top-4 z-10 flex h-fit w-16 flex-col items-center gap-4 overflow-auto text-xs`}
        animation={{
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -50, opacity: 0 },
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
      >
        <ToolButton
          active={tool === "select"}
          onClick={() => {
            state.tool = "select";
          }}
        >
          <PiCursor />
        </ToolButton>
        <ToolButton
          active={tool === "add_unit"}
          onClick={() => {
            if (tool === "add_unit") {
              state.tool = "select";
              return;
            }
            state.tool = "add_unit";
          }}
        >
          <MdOutlineDomainAdd />
        </ToolButton>
        <ToolButton
          active={tool === "skew"}
          onClick={() => {
            if (tool === "skew") {
              state.tool = "select";
              return;
            }
            state.tool = "skew";
          }}
        >
          <PiPerspective />
        </ToolButton>
        <hr className="m-1 h-[1px] w-full border-current" />
        {/* <ToolButton
                active={false}
                onClick={() => {
                  if (tool === "scroll") {
                    state.tool = "select";
                    return;
                  }
                  state.tool = "scroll";
                }}
              >
                {state.tool === "scroll" ? (
                  <MdSwapHorizontalCircle />
                ) : (
                  <MdOutlineSwapHorizontalCircle />
                )}
              </ToolButton> */}
        <ToolButton
          title="Zoom/Pan: 2 finger pinch to zoom, drag to pan, click to save and switch to select tool"
          active={tool === "zoom"}
          onClick={() => {
            if (tool === "zoom") {
              state.tool = "select";
              return;
            }
            state.tool = "zoom";
          }}
        >
          <TbZoomPan />
        </ToolButton>
        <hr className="m-1 h-[1px] w-full border-current" />
        <ToolButton
          title="Toggle Hidden Units"
          active={false}
          onClick={() => {
            state.showHiddenShapeLayers = !state.showHiddenShapeLayers;
          }}
        >
          {showHiddenShapeLayers ? <IoShapes /> : <IoShapesOutline />}
        </ToolButton>
      </Panel>
      <Panel
        bool
        className={`!absolute bottom-4 left-4 z-30 shadow-md`}
        animation={{
          initial: { x: -50, opacity: 0 },
          animate: { x: 0, opacity: 1 },
          exit: { x: -50, opacity: 0 },
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
      >
        <ToolButton
          title="Toggle Toolbar"
          active={false}
          onClick={() => {
            state.showToolbar = !state.showToolbar;
          }}
        >
          {showToolbar ? <AiFillCaretLeft /> : <AiFillCaretRight />}
        </ToolButton>
      </Panel>
    </>
  );
}

function ToolButton({
  active,
  onClick,
  children,
  className = "",
  title = undefined,
}: {
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
  title?: string;
}) {
  //
  return (
    <button
      title={title}
      className={`${className} ${
        active ? " rounded-md border-current shadow-sm" : " border-transparent"
      } relative flex h-fit w-fit select-none flex-col items-center justify-center border-[1px] text-lg transition-all duration-150 ease-linear hover:opacity-50`}
      onClick={onClick}
    >
      {children}
      {/* {active && <hr className="m-1  w-full border-current" />} */}
    </button>
  );
}
