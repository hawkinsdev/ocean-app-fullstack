import { useQuery } from "@tanstack/react-query";
import api from "../api/axios.client";
import { type Product } from "../types/product";

export const useProducts = () => {
  const { get } = api();

  const getProducts = async () => await get<Product[]>("/products");
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getProducts,
  });
};
