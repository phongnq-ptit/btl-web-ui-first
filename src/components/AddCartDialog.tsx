import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
} from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import React, { useContext, useState } from "react";
import { Book, User } from "../interface";
import { errorNotify, successNotify, warningNotify } from "../Notification";
import useCartApi from "../hooks/useCartApi";
import { CartContext } from "../context/CartContext";

interface Props {
  open: boolean;
  setOpen: Function;
  bookInfo: Book;
}

const AddCartDialog = ({ props }: { props: Props }) => {
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { addCartByUser } = useCartApi();
  const { isReload, setIsReload } = useContext(CartContext);

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrementOrDecrement = (action: string) => {
    switch (action) {
      case "increment":
        setQuantity(quantity + 1);
        break;
      case "decrement":
        if (quantity === 1) {
          warningNotify("Số lượng đặt hàng phải lớn hơn hoặc bằng 1!");
        } else {
          setQuantity(quantity - 1);
        }
        break;
    }
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleOk = () => {
    addCartByUser(user.id, props.bookInfo.id, quantity)
      .then((response) => {
        if (response.data !== null) {
          successNotify(response.message);
          setIsReload(!isReload);
        } else {
          errorNotify(response.message);
        }
      })
      .catch((e) => errorNotify(e.message))
      .finally(() => {
        props.setOpen(false);
        setQuantity(1);
      });
  };

  return (
    <Dialog
      open={props.open}
      aria-labelledby="customized-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: 20,
          boxShadow: "none",
        },
      }}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{
          backgroundColor: "#1fbb64",
          color: "white",
          fontWeight: 700,
          textTransform: "capitalize",
        }}
      >
        Xác nhận thêm sản phẩm vào giỏ hàng!
      </DialogTitle>
      <DialogContent sx={{ padding: 3, mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
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
              src={props.bookInfo?.image?.url}
            />
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2} direction="column">
              <Grid item color="darkgreen">
                Tên sách:
              </Grid>
              <Grid item>{props.bookInfo.title}</Grid>
              <Grid item color="darkgreen">
                Số lượng:
              </Grid>
              <Grid item>
                <Box display="flex">
                  <IconButton
                    aria-label="fingerprint"
                    sx={{ fontSize: "12px" }}
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
                    sx={{ fontSize: "12px" }}
                    color="info"
                    onClick={() => handleIncrementOrDecrement("increment")}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Grid>
              <Grid item color="darkgreen">
                Thành tiền:
              </Grid>
              <Grid item color="darkred" fontWeight={500}>
                {formatter.format(quantity * props.bookInfo.price)}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #ccc", paddingTop: 2 }}>
        <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
          Đóng
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Thêm Vào Giỏ Hàng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCartDialog;
