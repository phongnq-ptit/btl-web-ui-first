import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Bill, BillStatus } from "../interface";

interface Props {
  billItem: Bill;
  loadBill: boolean;
  setLoadBill: Function;
}

const BillItem = ({ props }: { props: Props }) => {
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const totalPrice = formatter.format(
    props.billItem.listProducts.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.books.price * currentValue.quantity;
    }, 0)
  );

  const colorChip = () => {
    switch (props.billItem.status) {
      case BillStatus.PENDING:
        return "error";
      case BillStatus.COMPLETED:
        return "success";
      case BillStatus.CANCEL:
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Grid container spacing={2} justifyItems="center" alignItems="center">
      <Grid item xs={3}>
        Ngày đặt hàng:
        <Typography variant="body2" color="#07bc0c" mt={1}>
          {props.billItem.date}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        Trạng thái:
        <Box mt={1}>
          <Chip
            label={props.billItem.status}
            size="small"
            color={colorChip()}
            variant="filled"
          />
        </Box>
      </Grid>
      <Grid item xs={3}>
        Tổng tiền đơn hàng:
        <Typography variant="body2" color="#07bc0c" mt={1}>
          {totalPrice}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Link
          to={`/bill/${props.billItem.id}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="outlined">Xem chi tiết</Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default BillItem;
