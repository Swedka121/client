import { animate } from "animejs";
import { toasterContext } from "../../app";
import { useContext, useEffect, useRef, useState } from "react";
import { InfoIcon, MessageSquareWarning } from "lucide-react";
import { from } from "rxjs";

function Toaster({
  closeDelay,
  onClose,
  data,
  type,
}: {
  closeDelay: number;
  onClose: () => void;
  data: string;
  type: "info" | "error";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    animate(ref.current, {
      x: { from: -500, to: 0, ease: "inSine", duration: 500 },
      opacity: { from: 0, to: 1, ease: "inSine", duration: 500 },
    });

    setTimeout(() => {
      animate(ref.current, {
        x: { from: 0, to: -500, ease: "inSine", duration: 500 },
        opacity: { from: 1, to: 0, ease: "inSine", duration: 500 },
      });
    }, closeDelay - 500);

    setTimeout(() => {
      onClose();
    }, closeDelay);
  }, []);
  return (
    <div
      className="w-100 border-2 border-(--secd-color) z-10 top-10 left-10 h-max rounded-lg p-5 bg-(--white-main) text-(--black-main)"
      ref={ref}
    >
      {type == "info" ? (
        <span className="w-full h-max flex flex-row gap-5 pb-5 font-bold font-[Deco]">
          <InfoIcon /> Info
        </span>
      ) : (
        <span className="w-full h-max flex flex-row gap-5 pb-5 font-bold font-[Deco]">
          <MessageSquareWarning /> Error
        </span>
      )}

      {data}
    </div>
  );
}

export default Toaster;
