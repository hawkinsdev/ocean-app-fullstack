import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios.client";
import { type TProduct } from "../types/product";
import { TResponseAPI } from "@/types/api";

export const useProducts = () => {
  const { get, post } = api();
  const queryClient = useQueryClient();

  const getProducts = async (): Promise<TProduct[]> => {
    const { data } = await get<TResponseAPI>("/api/products");
    return data?.data as TProduct[];
  };

  const addProduct = async (
    product: Omit<TProduct, "id">
  ): Promise<TProduct> => {
    const { data } = await post<TResponseAPI>("/api/products", product);
    return data?.data as TProduct;
  };

  const productsQuery = useQuery<TProduct[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    ...productsQuery,
    addProduct: addProductMutation,
  };
};
