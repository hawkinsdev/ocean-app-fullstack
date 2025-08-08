import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios.client";
import { TAddOrder, TOrder } from "@/types/order";
import { TResponseAPI } from "@/types/api";

export const useOrders = () => {
  const { get, post } = api();
  const queryClient = useQueryClient();

  const getOrders = async (): Promise<TOrder[]> => {
    const { data } = await get<TResponseAPI>("/api/orders");
    return data?.data as TOrder[];
  };

  const addOrder = async (order: TAddOrder): Promise<TOrder> => {
    const { data } = await post<TResponseAPI>("/api/orders", order);
    return data?.data as TOrder;
  };

  const ordersQuery = useQuery<TOrder[]>({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });

  const addOrderMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    ...ordersQuery,
    addOrder: addOrderMutation,
  };
};
