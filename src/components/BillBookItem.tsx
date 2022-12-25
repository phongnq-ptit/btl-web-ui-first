import {
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Cart } from "../interface";

interface Props {
  cartItem: Cart;
}

const BillBookItem = ({ props }: { props: Props }) => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const totalPrice = formatter.format(
    props.cartItem.quantity * props.cartItem.books.price
  );

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={"Tên sách: " + props.cartItem.books.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListSubheader>Thông tin sách:</ListSubheader>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Grid
                container
                spacing={2}
                direction="column"
                sx={{ color: "darkgreen", fontWeight: 500 }}
              >
                <Grid item xs={1}>
                  Tên Sách:
                </Grid>
                <Grid item xs={1}>
                  Tác Giả:
                </Grid>
                <Grid item xs={1}>
                  Ngày Xuất Bản:
                </Grid>
                <Grid item xs={1}>
                  Số Trang:
                </Grid>
                <Grid item xs={1}>
                  Thể Loại:
                </Grid>
                <Grid item xs={1}>
                  Giá Tiền:
                </Grid>
                <Grid item xs={6}>
                  Mô Tả:
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={1}>
                  {props.cartItem.books.title}
                </Grid>
                <Grid item xs={1}>
                  {props.cartItem.books.author}
                </Grid>
                <Grid item xs={1}>
                  {props.cartItem.books.date}
                </Grid>
                <Grid item xs={1}>
                  {props.cartItem.books.page}
                </Grid>
                <Grid item xs={1}>
                  {props.cartItem.books.category.label}
                </Grid>
                <Grid item xs={1}>
                  {formatter.format(props.cartItem.books.price!)}
                </Grid>
                <Grid item xs={6}>
                  {props.cartItem.books.description}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default BillBookItem;
