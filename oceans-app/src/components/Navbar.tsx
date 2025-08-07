import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Oceans App
        </Typography>
        <Button color="inherit" component={Link} to="/orders">
          Órdenes
        </Button>
        <Button color="inherit" component={Link} to="/dashboard">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/">
          Salir
        </Button>
      </Toolbar>
    </AppBar>
  );
}
