import { ReactNode } from "react";

function Container({ children }: { children: ReactNode }) {
  return <section className="w-[90%] h-full m-auto">{children}</section>;
}

export default Container;
