import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "@/hooks/useAuth";
import { useAuthData } from "@/hooks/useAuthData";

export default function Navbar() {
  const { closeSession } = useAuth();
  const authData = useAuthData();

  return (
    <AppBar position="static" className="!fixed top-0 left-0 right-0 z-50">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Oceans App
        </Typography>
        {authData?.user.role === "admin" && (
          <Button color="inherit" href="/users">
            Users
          </Button>
        )}
        <Button color="inherit" href="/products">
          Products
        </Button>
        <Button color="inherit" href="/orders">
          Órdenes
        </Button>
        <Button color="inherit" href="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" onClick={closeSession}>
          <LogoutIcon />
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
}
