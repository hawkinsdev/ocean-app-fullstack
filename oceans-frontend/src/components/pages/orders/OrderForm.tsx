/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Slider,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { TProduct } from "@/types/product";
import { TAddOrder } from "@/types/order";
import { toast } from "react-toastify";

type TOrderFormProps = {
  products: TProduct[];
  createdBy: string;
  onSubmit: (data: TAddOrder) => void;
};

type FormValues = {
  selected: Record<string, boolean>;
  quantities: Record<string, number>;
};

export default function OrderForm({
  products,
  createdBy,
  onSubmit,
}: TOrderFormProps) {
  const { control, handleSubmit, setValue, watch, reset } = useForm<FormValues>(
    {
      defaultValues: {
        selected: {},
        quantities: {},
      },
    }
  );

  const selected = watch("selected");
  const quantities = watch("quantities");

  const total = products.reduce((acc, product) => {
    if (selected?.[product.id] && quantities?.[product.id]) {
      return acc + product.price * quantities[product.id];
    }
    return acc;
  }, 0);

  const handleSelectChange = (id: string, checked: boolean) => {
    setValue(`selected.${id}`, checked);
    if (!checked) {
      setValue(`quantities.${id}`, 0);
    } else {
      if (!quantities?.[id]) setValue(`quantities.${id}`, 1);
    }
  };

  const handleQuantityChange = (id: string, value: number) => {
    const stock = products.find((p) => p.id === id)?.quantity ?? 0;
    const validValue = Math.min(Math.max(value, 1), stock);
    setValue(`quantities.${id}`, validValue);
  };

  const onSubmitForm = (data: FormValues) => {
    const selectedProducts = products
      .filter((p) => data.selected?.[p.id])
      .map((p) => ({
        ...p,
        quantity: data.quantities[p.id],
      }));

    if (selectedProducts.length === 0) {
      toast.warning("Debes seleccionar al menos un producto.");
      return;
    }

    onSubmit({
      products: selectedProducts,
      total,
      createdBy,
    });

    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmitForm)}
      sx={{ maxWidth: 800, mx: "auto", mb: 2, overflowY: "auto" }}
    >
      <Typography variant="h6" mb={2}>
        Selecciona productos
      </Typography>

      <Stack spacing={2}>
        {products.map((product) => {
          const isSelected = selected?.[product.id] || false;
          const quantity = quantities?.[product.id] ?? 0;

          return (
            <Box
              key={product.id}
              className="flex flex-col md:flex-row md:items-center gap-4 justify-between"
            >
              <FormControlLabel
                control={
                  <Controller
                    name={`selected.${product.id}`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        {...field}
                        checked={field.value || false}
                        onChange={(e) =>
                          handleSelectChange(product.id, e.target.checked)
                        }
                      />
                    )}
                  />
                }
                label={
                  <Box className="flex items-center gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <Box>
                      <Typography variant="h5">{product.name}</Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        maxWidth={500}
                      >
                        {product.description}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        ${product.price.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Stock disponible: {product.quantity}
                      </Typography>
                    </Box>
                  </Box>
                }
              />

              {isSelected && (
                <Box sx={{ width: 150, ml: 2 }}>
                  <Typography gutterBottom>Cantidad: {quantity}</Typography>
                  <Controller
                    name={`quantities.${product.id}`}
                    control={control}
                    render={({ field }) => (
                      <Slider
                        {...field}
                        min={1}
                        max={product.quantity}
                        value={quantity}
                        onChange={(_, val) =>
                          handleQuantityChange(product.id, val as number)
                        }
                        valueLabelDisplay="auto"
                      />
                    )}
                  />
                </Box>
              )}
            </Box>
          );
        })}
      </Stack>

      <Typography variant="h6" mt={3}>
        Total: ${total.toLocaleString()}
      </Typography>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Cerrar Orden
      </Button>
    </Box>
  );
}
