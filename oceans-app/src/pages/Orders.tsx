import { useProducts } from "../hooks/useProducts";
import { CircularProgress, Typography, List, ListItem } from "@mui/material";

export default function Orders() {
  const { data, isLoading, error } = useProducts();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error al cargar productos</Typography>;

  return (
    <List>
      {data?.map((p) => (
        <ListItem key={p.id}>
          {p.name} - ${p.price}
        </ListItem>
      ))}
    </List>
  );
}
