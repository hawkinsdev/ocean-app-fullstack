"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { ProductFormType, productSchema } from "@/schemas/productSchema";
import { useProducts } from "@/hooks/useProducts";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const ProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormType>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  });

  const { addProduct } = useProducts();

  const onSubmit = (data: ProductFormType) => {
    addProduct.mutate(data, {
      onSuccess: () => {
        toast.success("Product created successfully.");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const message = error?.response?.data?.message || "Error.";
          toast.error(message);
        }
      },
    });
    reset();
  };

  return (
    <Container maxWidth="sm" className="mx-auto">
      <Box className="flex flex-col items-center">
        <Typography variant="h5" align="center" gutterBottom>
          Crear Producto
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            label="Descripción"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <TextField
            label="Precio"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{ step: "0.01", min: "0" }}
            {...register("price", {
              valueAsNumber: true,
            })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />

          <TextField
            label="URL de Imagen"
            fullWidth
            margin="normal"
            {...register("image")}
            error={!!errors.image}
            helperText={errors.image?.message}
          />

          <TextField
            label="Cantidad"
            type="number"
            fullWidth
            margin="normal"
            inputProps={{ min: "0", step: "1" }}
            {...register("quantity", {
              valueAsNumber: true,
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />

          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Crear Producto
          </Button>
        </form>
      </Box>
    </Container>
  );
};
