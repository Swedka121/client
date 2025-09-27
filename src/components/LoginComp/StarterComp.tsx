"use client";
import { use, useEffect } from "react";
import { useUserStore } from "../../../stores/userStore";

function StarterComp({
  searchParams,
}: {
  searchParams: Promise<{ sucess?: string; error?: string }>;
}) {
  const query = use(searchParams);
  const userStore = useUserStore();

  useEffect(() => {
    if (query.sucess) userStore.setAccessToken(query.sucess as string);
  }, []);

  return <></>;
}

export default StarterComp;
