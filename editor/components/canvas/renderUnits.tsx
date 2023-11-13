import { state } from "@/common/state";
import { Canvas as FCanvas, Path, Textbox } from "fabric";
import { getBoundsColor } from "@/hooks/useTools";

export default function renderUnits(
  canvas: FCanvas,
  frames: Unit[][],
  currentIndex: number,
) {

  frames[currentIndex]?.forEach((unit) => {
    const path = new Path(unit.d, {
      fill: unit.visible ? state.colors.unit.default : state.colors.unit.hidden,
      stroke: "rgb(29,29,29)",
      opacity: 0.5,
      hoverCursor: "grab",
      selectable: true,
      cornerColor: getBoundsColor(),
      borderColor: getBoundsColor(),
      cornerSize: 10,
    });

    const text = new Textbox(`${unit.number.text.toLocaleUpperCase()}`, {
      left: unit.number.x,
      top: unit.number.y - path.height / 2,
      fill: "white",
      cornerColor: getBoundsColor(),
      borderColor: getBoundsColor(),
      cornerSize: 10,
      fontFamily: "Arial",
      fontSize: 24,
      selectable: true,
      editable: true,
    });

    canvas.add(path, text);
  });
}
