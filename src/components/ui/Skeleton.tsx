import { useLoadingStore } from "@stores/loadingStore";
import { HTMLProps, ReactNode } from "react";

export function SkeletonBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const loadingStore = useLoadingStore();
  return (
    <div
      className={"w-full h-full " + className}
      style={{ display: loadingStore.isLoading ? "block" : "none" }}
    >
      {children}
    </div>
  );
}

export function Skeleton({ className, ...args }: HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={"bg-gray-200 rounded-md animate-pulse " + className}
      {...args}
    ></div>
  );
}
