/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { TProduct } from "@/types/product";
import ImageIcon from "@mui/icons-material/Image";
import { ListItemIcon } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open: boolean;
  onClose: () => void;
  products: TProduct[];
  total: number;
}
export const ModalFullscreen: React.FC<Props> = ({
  onClose,
  open: modal,
  products,
  total,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open || modal}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Productos
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              CERRAR
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          {products?.map((product) => (
            <React.Fragment key={product.id}>
              <ListItemButton>
                <ListItemIcon>
                  {product ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      width={50}
                      height={50}
                    />
                  ) : (
                    <ImageIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={product.name}
                  secondary={product.price}
                />
              </ListItemButton>
              <Divider />
            </React.Fragment>
          ))}
          <ListItemButton>
            <ListItemIcon className="text-lg font-bold">Total: </ListItemIcon>
            <ListItemText
              primary={
                <div className="flex  items-center">
                  <AttachMoneyIcon sx={{ fontSize: 20 }} />
                  {total.toLocaleString()}
                </div>
              }
            ></ListItemText>
          </ListItemButton>
          <Divider />
        </List>
      </Dialog>
    </React.Fragment>
  );
};
