"use client";
import React from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { Typography, LinearProgress } from "@mui/material";
import { useOrders } from "@/hooks/useOrders";
import { OrderTable } from "@/components/pages/orders/TableOrder";

export default function Dashboard() {
  const { data, isLoading } = useOrders();
  return (
    <PrivateRoute>
      <div className="w-full">
        <Typography variant="h4">Orders</Typography>
        {isLoading && <LinearProgress />}
        <OrderTable orders={data || []} />
      </div>
    </PrivateRoute>
  );
}
