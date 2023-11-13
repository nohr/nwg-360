export default function useDrag(ref: React.RefObject<HTMLDivElement>) {
  const ele = ref.current;
  //  todo fix lag
  if (!ele) return;
  let pos = { left: 0, x: 0 };
  const mod = 1;

  const mouseDownHandler = function (e: MouseEvent) {
    pos = {
      left: ele.scrollLeft,
      x: e.clientX,
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e: MouseEvent) {
    const dx = e.clientX - pos.x * mod;
    ele.scrollLeft = pos.left - dx;
  };

  const mouseUpHandler = function () {
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };

  ele.addEventListener("mousedown", mouseDownHandler as EventListener);
}
