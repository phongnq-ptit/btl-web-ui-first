import { Box, Grid, IconButton, ListItem } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useState } from "react";
import { Book, Cart } from "../interface";
import { errorNotify, warningNotify } from "../Notification";
import useCartApi from "../hooks/useCartApi";

interface Props {
  cartItem: Cart;
}

const CartItem = ({ props }: { props: Props }) => {
  const { updateCart } = useCartApi();
  const bookInfo: Book = props.cartItem.books;

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const [quantity, setQuantity] = useState<number>(props.cartItem.quantity);

  const handleIncrementOrDecrement = (action: string) => {
    switch (action) {
      case "increment":
        setQuantity(quantity + 1);
        updateCart(props.cartItem.id, quantity + 1, 1)
          .then((response) => {})
          .catch((err) => errorNotify(err.message));
        break;
      case "decrement":
        if (quantity === 1) {
          warningNotify("Số lượng đặt hàng phải lớn hơn hoặc bằng 1!");
        } else {
          setQuantity(quantity - 1);
          updateCart(props.cartItem.id, quantity - 1, 1)
            .then((response) => {})
            .catch((err) => errorNotify(err.message));
        }
        break;
    }
  };

  return (
    <ListItem divider>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={3}>
          <Box
            component="img"
            sx={{
              width: "100px",
              height: "100px",
              objectFit: "contain",
              p: 1,
              backgroundColor: "#c5dcff",
              borderRadius: "5px",
            }}
            src={bookInfo?.image?.url}
          />
        </Grid>
        <Grid item xs={3} color="darkblue" fontWeight={500}>
          {bookInfo.title}
        </Grid>
        <Grid item xs={3}>
          <Box display="flex">
            <IconButton
              aria-label="fingerprint"
              color="info"
              onClick={() => handleIncrementOrDecrement("decrement")}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton aria-label="fingerprint" color="success">
              {quantity}
            </IconButton>
            <IconButton
              aria-label="fingerprint"
              color="info"
              onClick={() => handleIncrementOrDecrement("increment")}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={3} color="darkred" fontWeight={500}>
          {formatter.format(quantity * bookInfo.price)}
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default CartItem;
