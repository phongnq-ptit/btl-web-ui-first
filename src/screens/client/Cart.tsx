import { Grid, List, ListItem } from "@mui/material";
import React, { useContext } from "react";
import CartItem from "../../components/CartItem";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { myCart } = useContext(CartContext);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <List style={{ maxHeight: "100%", overflow: "auto" }}>
          <ListItem divider>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{
                color: "darkgreen",
                fontWeight: 500,
              }}
            >
              <Grid item xs={3}>
                Ảnh
              </Grid>
              <Grid item xs={3}>
                Tên Sách
              </Grid>
              <Grid item xs={3}>
                Số Lượng
              </Grid>
              <Grid item xs={2}>
                Thành Tiền
              </Grid>
              <Grid item xs={1}></Grid>
            </Grid>
          </ListItem>
          {myCart.map((item) => (
            <CartItem key={item.id} props={{ cartItem: item }} />
          ))}
        </List>
      </Grid>
      <Grid item xs={4}>
        cho thanh toan
      </Grid>
    </Grid>
  );
};

export default Cart;
