import { ReactNode } from "react";

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={
        "w-fit h-fit p-6 border-1 border-(--main-color) rounded-lg shadow-(--tint-1) transition-all " +
        className
      }
    >
      {children}
    </article>
  );
}

export const CardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="text-[1.3rem] font-medium flex flex-row gap-2 items-center w-full">
      {children}
    </h2>
  );
};

export default Card;
