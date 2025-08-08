"use client";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InventoryIcon from "@mui/icons-material/Inventory";
import { TOrder } from "@/types/order";
import { Button } from "@mui/material";
import { TProduct } from "@/types/product";
import { ModalFullscreen } from "./ModalFullscreen";
import { formatDate } from "@/lib/utils";

interface Props {
  orders: TOrder[];
}
export const OrderTable: React.FC<Props> = ({ orders }) => {
  const [products, setProducts] = useState<TProduct[]>();
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(0);

  const handleClickProducts = (products: TProduct[], total: number) => {
    setProducts(products);
    setOpen(!open);
    setTotal(total);
  };

  const tableHeaders = ["#", "MESERO", "PRODUCTOS", "FECHA", "ESTADO"];
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, k) => (
                <TableCell key={k} className="!font-bold">
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row, k) => (
              <TableRow
                key={k}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {k + 1}
                </TableCell>
                <TableCell>{row.createdBy}</TableCell>
                <TableCell>
                  <Button
                    className="flex !font-bold gap-1 justify-center items-center"
                    onClick={() => handleClickProducts(row.products, row.total)}
                  >
                    <InventoryIcon />
                    {row.products?.length}
                  </Button>
                </TableCell>
                <TableCell>{formatDate(row.createdAt)}</TableCell>
                <TableCell>{row.closed ? "Cerrada" : "Abierta"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalFullscreen
        open={open}
        onClose={() => setOpen(!open)}
        products={products || []}
        total={total}
      />
    </div>
  );
};
