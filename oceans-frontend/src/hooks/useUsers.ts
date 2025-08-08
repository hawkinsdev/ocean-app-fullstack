import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios.client";
import type { TUser } from "@/types/auth";
import { TResponseAPI } from "@/types/api";

export const useUsers = () => {
  const { get, post } = api();
  const queryClient = useQueryClient();

  const getUsers = async (): Promise<TUser[]> => {
    const { data } = await get<TResponseAPI>("/api/users");
    return data?.data as TUser[];
  };

  const addUser = async (user: Omit<TUser, "id">): Promise<TUser> => {
    const { data } = await post<TResponseAPI>("/api/users", user);
    return data?.data as TUser;
  };

  const usersQuery = useQuery<TUser[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const addUserMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    ...usersQuery,
    addUser: addUserMutation,
  };
};
