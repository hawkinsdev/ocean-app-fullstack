"use client";
import PrivateRoute from "@/components/PrivateRoute";
import { OrderTable } from "@/components/pages/orders/TableOrder";
import { useOrders } from "@/hooks/useOrders";
import { Typography, LinearProgress, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuthData } from "@/hooks/useAuthData";

export default function Orders() {
  const { data, isLoading } = useOrders();
  const authData = useAuthData();

  return (
    <PrivateRoute>
      {isLoading && <LinearProgress />}
      <div className="w-full">
        <Typography variant="h4">Orders</Typography>
        <div className="bg-white !p-5 rounded-lg">
          {authData?.user.role === "admin" && (
            <Button href="/orders/new">
              <AddIcon />
              Nuevo
            </Button>
          )}
          <OrderTable orders={data || []} />
        </div>
      </div>
    </PrivateRoute>
  );
}
