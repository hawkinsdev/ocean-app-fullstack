import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { TAuthData } from "../types/auth";

export const useAuthData = (): TAuthData | undefined => {
  const queryClient = useQueryClient();
  const [authData, setAuthData] = useState<TAuthData | undefined>(() =>
    queryClient.getQueryData(["auth"])
  );

  useEffect(() => {
    if (!authData) {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsed = JSON.parse(data) as TAuthData;
        if (parsed.token) {
          setAuthData(parsed);
          queryClient.setQueryData(["auth"], parsed);
        }
      }
    }
  }, [authData, queryClient]);

  return authData;
};
