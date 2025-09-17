"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "../../../stores/userStore";

function StarterComp() {
  const query = useSearchParams();
  const userStore = useUserStore();

  useEffect(() => {
    if (query?.has("success"))
      userStore.setAccessToken(query.get("success") as string);
  }, []);

  return <></>;
}

export default StarterComp;
