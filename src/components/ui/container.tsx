import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <div className="w-[90%] m-auto">{children}</div>;
}

export default Container;
