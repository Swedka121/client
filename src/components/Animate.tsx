import * as anime from "animejs";
import { ReactNode, Ref, RefObject, useEffect } from "react";

function Animate({
  children,
  rootRef,
}: {
  children: ReactNode;
  rootRef: RefObject<HTMLElement>;
}) {
  useEffect(() => {
    if (!rootRef.current) return;

    const items = Array.from(rootRef.current.childNodes) as HTMLElement[];

    items.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(-80px)";
    });

    anime.animate(items, {
      duration: 300,
      delay: anime.stagger(30), // smooth stagger
      ease: "inOutElastic",
      opacity: [0, 1],
      translateY: [-80, 0],
    });
  }, []);

  return children;
}

export default Animate;
