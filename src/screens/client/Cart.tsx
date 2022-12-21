import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListSubheader,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import CartItem from "../../components/CartItem";
import { CartContext } from "../../context/CartContext";
import useBillApi from "../../hooks/useBillApi";
import { BillStatus, User } from "../../interface";
import { errorNotify, successNotify } from "../../Notification";

const Cart = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { myCart, isReload, setIsReload } = useContext(CartContext);
  const { createBill } = useBillApi();
  const { handleSubmit, control } = useForm();

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const save = (data: any) => {
    const cartIds = myCart.map((item) => {
      return item.id;
    });

    const date = new Date().toLocaleString("it-IT", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    createBill({
      date: date,
      status: BillStatus.PENDING,
      userId: user.id,
      listBooks: { carts: cartIds },
      userInfo: { ...data },
    })
      .then((response) => {
        if (response.data !== null) {
          successNotify(response.message);
          setIsReload(!isReload);
        } else {
          errorNotify(response.message);
        }
      })
      .catch((e) => errorNotify(e.message))
      .finally(() => {});
  };

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
      <Grid item xs={4} px={3}>
        {user === null ? (
          <Box>Data not found</Box>
        ) : (
          <List>
            <Box>
              <ListSubheader>Thông tin người mua.</ListSubheader>
              <form onSubmit={handleSubmit(save)}>
                <Controller
                  name="email"
                  defaultValue={user.email}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      type="email"
                      margin="normal"
                      label="Email"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
                <Controller
                  name="name"
                  defaultValue={user.name}
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Tên khách hàng"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
                <Controller
                  name="tel"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Số điện thoại"
                      type="number"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
                <Controller
                  name="address"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      margin="normal"
                      label="Địa chỉ"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : null}
                      fullWidth
                    />
                  )}
                  rules={{
                    required: "Không được để trống!",
                  }}
                />
                <ListSubheader>Tổng số tiền cần thanh toán.</ListSubheader>
                <Typography variant="h4" color="darkcyan" fontWeight={700}>
                  {formatter.format(
                    myCart.reduce((accumulator, currentValue) => {
                      return (
                        accumulator +
                        currentValue.books.price * currentValue.quantity
                      );
                    }, 0)
                  )}
                </Typography>
                <Box width={"100%"}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 2, width: "100%", fontWeight: 700 }}
                  >
                    Thanh Toán
                  </Button>
                </Box>
              </form>
            </Box>
          </List>
        )}
      </Grid>
    </Grid>
  );
};

export default Cart;
