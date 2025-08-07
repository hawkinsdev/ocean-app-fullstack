import { useMutation } from "@tanstack/react-query";
import createApiClient from "../api/axios.client";
import type { LoginForm } from "../types/auth";

export const useAuth = () => {
  const { post } = createApiClient();
  const login = useMutation({
    mutationFn: async (data: LoginForm) => {
      const res = await post("/login", data);
      return res.data;
    },
  });

  return { login };
};
