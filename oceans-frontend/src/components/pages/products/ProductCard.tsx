import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { TProduct } from "@/types/product";
import { Button, CardActions } from "@mui/material";

export const ProductCard: React.FC<TProduct> = ({
  description,
  image,
  name,
  price,
  quantity,
}) => {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image={image}
          alt={image}
          sx={{ height: 180 }}
        />
        <CardContent sx={{ height: 120 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>
        <CardActions className="flex justify-between">
          <Button
            size="medium"
            color="secondary"
            disabled
            className="!font-bold"
          >
            Precio: ${price.toLocaleString()}
          </Button>
          <Button size="small" color="info" className="hover:!bg-transparent">
            Cantidad {quantity}
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
