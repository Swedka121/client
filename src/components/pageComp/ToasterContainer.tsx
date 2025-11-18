import { createContext, ReactNode, useState } from "react";
import Toaster from "./Toaster";
import { useToasterStore } from "@stores/toasterStore";

export const toaster = createContext({
  add: (data: string, type: "info" | "error") => {
    console.log("callback!");
  },
});

export function ToasterContainer() {
  const toaster = useToasterStore();

  return (
    <>
      <div className="w-120 h-max flex flex-col gap-2 absolute z-10 top-5 left-5">
        {toaster.toaster.map((el) => (
          <Toaster
            key={el.id}
            {...el}
            closeDelay={3000}
            onClose={() => toaster.remove(el.id)}
          />
        ))}
      </div>
    </>
  );
}

export default ToasterContainer;
