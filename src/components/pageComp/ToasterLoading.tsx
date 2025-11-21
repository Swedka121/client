import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useLanguagePack } from "@hooks/useLanguagePack";
import { useLoadingStore } from "@stores/loadingStore";

function ToasterLoading() {
  const loadingStore = useLoadingStore();
  const ref = useRef<HTMLDivElement | null>(null);
  const languagePack = useLanguagePack();
  const [isHidden, setIsHidden] = useState(true);
  useEffect(() => {
    if (loadingStore.isLoading) {
      setIsHidden(false);
      animate(ref.current, {
        x: { from: -500, to: 0, ease: "inSine", duration: 500 },
        opacity: { from: 0, to: 1, ease: "inSine", duration: 500 },
      });
    } else {
      let timeout2: unknown;
      const timeout = setTimeout(() => {
        animate(ref.current, {
          x: { from: 0, to: -500, ease: "inSine", duration: 500 },
          opacity: { from: 1, to: 0, ease: "inSine", duration: 500 },
        });
        timeout2 = setTimeout(() => {
          setIsHidden(true);
        }, 500);
      }, 600);
      return () => {
        clearTimeout(timeout);
        clearTimeout(timeout2 as NodeJS.Timeout);
      };
    }
  }, [loadingStore]);
  return (
    <div
      className="w-100 border-2 border-(--secd-color) z-10 top-10 left-10 h-max rounded-lg p-5 bg-(--white-main) text-(--black-main)"
      style={{ display: isHidden ? "none" : "block" }}
      ref={ref}
    >
      <div className="w-full h-fit flex flex-row gap-5 items-center font-medium">
        <Loader2Icon
          color="var(--secd-color)"
          className="animate-spin w-10 h-10"
        />
        {languagePack.please_wait_loading}
      </div>
    </div>
  );
}

export default ToasterLoading;
