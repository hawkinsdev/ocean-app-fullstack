"use client";

import PrivateRoute from "@/components/PrivateRoute";
import { ProductCard } from "@/components/pages/products/ProductCard";
import { useProducts } from "@/hooks/useProducts";
import { Button, LinearProgress, Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { useAuthData } from "@/hooks/useAuthData";

export default function Products() {
  const { data, isLoading } = useProducts();
  const authData = useAuthData();

  return (
    <PrivateRoute>
      <div className="w-full">
        <Typography variant="h4">Products</Typography>
        {isLoading && <LinearProgress />}
        <div className="bg-white !p-5 rounded-lg flex flex-col gap-2  items-start">
          {authData?.user.role === "admin" && (
            <Button href="/products/new">
              <AddIcon />
              Nuevo
            </Button>
          )}
          <div className="w-full overflow-x-auto !p-5">
            <div className="flex flex-nowrap gap-4">
              {data?.map((product) => (
                <div
                  key={product.id}
                  className="inline-block min-w-[250px] p-2 bg-amber-200"
                >
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
