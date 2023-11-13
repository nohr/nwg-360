import { RefObject, useEffect, useRef, useState } from "react";

export const useTimelineResize = (timelineRef: RefObject<HTMLDivElement>) => {
  const [timelineHeight, setTimelineHeight] = useState(32);
  const resizeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      // console.log(timelineRef.current?.scrollLeft);
      console.log(timelineRef.current?.scrollWidth);

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const resize = resizeRef.current;
      const timeline = timelineRef.current;
      const section = document.querySelector("section");
      let y = e.clientY;
      if (resize && timeline && section) {
        y -= timeline.getBoundingClientRect().top || 0;
        const bottom = `${timeline.clientHeight - y}px`;

        if (
          y < 32 ||
          y > section?.clientHeight / 2 - timeline.getBoundingClientRect().top
        )
          resize.classList.add("active:!text-red-500");
        else {
          resize.style.bottom = bottom;
          resize.classList.remove("active:!text-red-500");
        }
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (resizeRef.current) {
        resizeRef.current.style.bottom = "0";
      }
      const timeline = timelineRef.current;
      let y = e.clientY;
      y -= timeline?.getBoundingClientRect().top || 0;
      const section = document.querySelector("section");
      if (y < 32) setTimelineHeight(32);
      else if (section && y > section.clientHeight / 2)
        setTimelineHeight(section.clientHeight / 2);
      else setTimelineHeight(y);

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    if (resizeRef.current) {
      resizeRef.current.addEventListener("mousedown", handleMouseDown);
    }

    return () => {
      if (resizeRef.current) {
        resizeRef.current.removeEventListener("mousedown", handleMouseDown);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [timelineRef]);

  return { timelineHeight, resizeRef };
};
