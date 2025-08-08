"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "@/schemas/loginSchema";
import { useAuth } from "@/hooks/useAuth";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();
  const { login } = useAuth();

  const onSubmit = (data: LoginSchemaType) => {
    login.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: (err) => {
        console.error("Error en login:", err);
      },
    });
  };

  return (
    <Container maxWidth="xs" className="mx-auto">
      <Box sx={{ mt: 8 }} className="flex flex-col justify-center items-center">
        <Typography variant="h5" align="center">
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
            Ingresar
          </Button>
        </form>
      </Box>
    </Container>
  );
}
