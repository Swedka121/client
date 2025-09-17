"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";

export function useIsAuthenticated() {
  const userStore = useUserStore();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      const result = await userStore.isAuthenticated();
      if (active) setIsAuthenticated(result);
    })();

    return () => {
      active = false;
    };
  }, [userStore]);

  return isAuthenticated;
}
