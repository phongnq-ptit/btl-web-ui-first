import {
  Box,
  Collapse,
  Grid,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Cart } from "../interface";

interface Props {
  cartItem: Cart;
}

const BillBookItem = ({ props }: { props: Props }) => {
  const [open, setOpen] = useState<boolean>(true);

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
      <ListItemButton
        onClick={handleClick}
        sx={{ backgroundColor: "#d7d7d7", borderBottom: "3px solid #ccc" }}
      >
        <ListItemText primary={"Tên sách: " + props.cartItem.books.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListSubheader>Thông tin sách:</ListSubheader>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "300px",
                    height: "300px",
                    objectFit: "contain",
                    p: 1,
                    backgroundColor: "#c5dcff",
                    borderRadius: "5px",
                  }}
                  src={props.cartItem.books.image?.url}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
          </Grid>
          <ListSubheader>Thông tin mua hàng:</ListSubheader>
          <Grid container spacing={2} mb={2}>
            <Grid item xs={3}>
              Số lượng:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {props.cartItem.quantity}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Thành tiền:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {totalPrice}
              </Typography>
            </Grid>
          </Grid>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default BillBookItem;
