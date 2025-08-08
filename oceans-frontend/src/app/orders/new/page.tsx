"use client";
import PrivateRoute from "@/components/PrivateRoute";
import OrderForm from "@/components/pages/orders/OrderForm";
import { useAuthData } from "@/hooks/useAuthData";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { TAddOrder } from "@/types/order";
import { Typography, LinearProgress } from "@mui/material";

export default function Orders() {
  const { addOrder } = useOrders();
  const { data: products, isLoading } = useProducts();
  const authData = useAuthData();

  const onSubmit = (data: TAddOrder) => {
    addOrder.mutate(data);
  };

  return (
    <PrivateRoute>
      <div className="w-full">
        <Typography variant="h4">Orders</Typography>
        {isLoading && <LinearProgress />}
        <div className="bg-white !p-5 rounded-lg">
          <OrderForm
            products={products || []}
            createdBy={authData?.user.id as string}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </PrivateRoute>
  );
}
