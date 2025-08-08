import { useQueryClient } from "@tanstack/react-query";
import type { TAuthData } from "../types/auth";

export const useAuthData = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(["auth"]) as TAuthData;
};
