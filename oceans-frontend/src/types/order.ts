import { TProduct } from "./product";

export type TOrder = {
  id: string;
  products: TProduct[];
  total: number;
  closed: boolean;
  createdBy: string;
  createdAt: string;
};

export type TAddOrder = {
  products: TProduct[];
  total: number;
  createdBy: string;
};
