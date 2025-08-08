import { useMutation, useQueryClient } from "@tanstack/react-query";
import createApiClient from "../api/axios.client";
import type { TLoginForm } from "../types/auth";
import type { TResponseAPI } from "../types/api";

export const useAuth = () => {
  const { post } = createApiClient();
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (data: TLoginForm) => {
      const res = await post("/login", data);
      return res.data as TResponseAPI;
    },
    onSuccess: ({ data }) => {
      console.log("Data", data);
      queryClient.setQueryData(["auth"], data);

      localStorage.setItem("auth", JSON.stringify(data));
    },
  });

  return { login };
};
