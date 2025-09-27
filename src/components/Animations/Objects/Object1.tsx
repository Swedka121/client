"use client";
import { createTimeline } from "animejs";
import { useEffect, useRef } from "react";

function Object1() {
  const ref = useRef<SVGSVGElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const lines = ref.current.querySelectorAll("line");

    lines.forEach((el) => {
      console.log("animate", el, el.x1, el.x2);
      const timeline = createTimeline()
        .add(el, {
          target: "line",
          delay: 100,
          x2: [
            {
              from: Number(el.x1.baseVal.value),
              to: Number(el.x2.baseVal.value),
              ease: "inCubic",
              duration: 800,
              direction: "alternate",
            },
          ],
          y2: [
            {
              from: Number(el.x1.baseVal.value),
              to: Number(el.y2.baseVal.value),
              ease: "inCubic",
              duration: 800,
              direction: "alternate",
            },
          ],
        })
        .add(el, {
          target: "line",
          delay: 100,
          x1: [
            {
              from: Number(el.x1.baseVal.value),
              to: Number(el.x2.baseVal.value),
              ease: "inCubic",
              duration: 800,
              direction: "alternate",
            },
          ],
          y1: [
            {
              from: String(el.y1.baseVal.value),
              to: String(el.y2.baseVal.value),
              ease: "inCubic",
              duration: 800,
              direction: "alternate",
            },
          ],
        });
      timeline.play();
    });
  }, []);
  return (
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg" ref={ref}>
      <g id="Layer_1">
        <title>Layer 1</title>
        <line
          strokeWidth="5"
          id="svg_1"
          y2="164.93178"
          x2="79.3932"
          y1="71.75001"
          x1="160.75679"
          stroke="#000"
          fill="none"
        />
        <line
          strokeWidth="5"
          id="svg_2"
          y2="119.47726"
          x2="33.93868"
          y1="26.29549"
          x1="115.30227"
          stroke="#000"
          fill="none"
        />
        <line
          strokeWidth="5"
          id="svg_3"
          y2="128.56816"
          x2="43.02958"
          y1="35.3864"
          x1="124.39317"
          stroke="#000"
          fill="none"
        />
        <line
          strokeWidth="5"
          id="svg_4"
          y2="137.65907"
          x2="52.12049"
          y1="44.4773"
          x1="133.48408"
          stroke="#000"
          fill="none"
        />
        <line
          strokeWidth="5"
          id="svg_5"
          y2="146.74997"
          x2="61.21139"
          y1="53.5682"
          x1="142.57498"
          stroke="#000"
          fill="none"
        />
        <line
          strokeWidth="5"
          id="svg_6"
          y2="155.84087"
          x2="70.30229"
          y1="62.65911"
          x1="151.66588"
          stroke="#000"
          fill="none"
        />
      </g>
    </svg>
  );
}

export default Object1;
