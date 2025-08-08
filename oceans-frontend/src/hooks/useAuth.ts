import { useMutation, useQueryClient } from "@tanstack/react-query";
import createApiClient from "@/api/axios.client";
import type { TAuthData, TLoginForm } from "@/types/auth";
import type { TResponseAPI } from "@/types/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const { post } = createApiClient();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const login = useMutation({
    mutationFn: async (data: TLoginForm) => {
      const res = await post("/login", data);
      return res.data as TResponseAPI;
    },
    onSuccess: ({ data }) => {
      queryClient.setQueryData(["auth"], data);
      localStorage.setItem("auth", JSON.stringify(data));
    },
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const authData = JSON.parse(data) as TAuthData;
      if (authData.token) {
        queryClient.setQueryData(["auth"], authData); // <-- sincroniza cache React Query
        setAuthenticated(true);
        setLoading(false);
        return;
      }
    }
    router.push("/");
    setAuthenticated(false);
    setLoading(false);
  }, [router, queryClient, authenticated]);

  const closeSession = () => {
    localStorage.clear();
    setAuthenticated(false);
  };

  return { login, loading, authenticated, closeSession };
};
