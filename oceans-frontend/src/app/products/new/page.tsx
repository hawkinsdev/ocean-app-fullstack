"use client";
import { ProductForm } from "@/components/pages/products/FormProduct";
import PrivateRoute from "@/components/PrivateRoute";

export default function NewProduct() {
  return (
    <PrivateRoute>
      <ProductForm />
    </PrivateRoute>
  );
}
