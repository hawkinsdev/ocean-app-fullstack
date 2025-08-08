import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchemaType } from "../schemas/loginSchema";
import { useAuth } from "../hooks/useAuth";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = (data: LoginSchemaType) => {
    login.mutate(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err) => {
        console.error("Error en login:", err);
      },
    });
  };

  return (
    <Container maxWidth="xs">
      <div className="bg-red">asdasd</div>
      <Box sx={{ mt: 8 }} className="flex justify-center items-center bg-red">
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
