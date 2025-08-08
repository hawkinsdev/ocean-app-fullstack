"use client";

import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  LinearProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import PrivateRoute from "@/components/PrivateRoute";
import { useUsers } from "@/hooks/useUsers";
import { TUserSchema, userSchema } from "@/schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export type TUser = {
  id: string;
  username: string;
  password?: string;
  email: string;
  role: "admin" | "waiter";
};

type FormInputs = Omit<TUser, "id">;

export default function UsersView() {
  const { data: users, isLoading, addUser } = useUsers();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUserSchema>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      password: "",
      username: "",
      email: "",
      role: "waiter",
    },
  });

  const onSubmit = (data: FormInputs) => {
    addUser.mutate(data);
    reset();
  };

  return (
    <PrivateRoute>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" mb={3}>
          Usuarios
        </Typography>

        {isLoading && <LinearProgress />}
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h6" mb={2}>
            Agregar nuevo usuario
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: "El usuario es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Usuario"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                  sx={{ flex: "1 1 200px" }}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Email inválido",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  sx={{ flex: "1 1 250px" }}
                />
              )}
            />

            {/* Campo contraseña agregado */}
            <Controller
              name="password"
              control={control}
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Mínimo 6 caracteres",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  sx={{ flex: "1 1 200px" }}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <FormControl sx={{ flex: "1 1 150px" }}>
                  <InputLabel id="role-label">Rol</InputLabel>
                  <Select {...field} labelId="role-label" label="Rol">
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="waiter">Mesero</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Button type="submit" variant="contained" sx={{ height: 56 }}>
              Agregar
            </Button>
          </Box>
        </Paper>

        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Usuario</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {isLoading && <LinearProgress />}
              {users?.map((user, k) => (
                <TableRow key={k}>
                  <TableCell>{k + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.role === "admin" ? "Admin" : "Mesero"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </PrivateRoute>
  );
}
