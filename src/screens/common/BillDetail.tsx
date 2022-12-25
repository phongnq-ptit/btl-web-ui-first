import {
  Box,
  Button,
  Grid,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bill, User } from "../../interface";
import useBillApi from "../../hooks/useBillApi";
import { errorNotify } from "../../Notification";
import BillBookItem from "../../components/BillBookItem";

const BillDetail = () => {
  const params = useParams();
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const { getBill } = useBillApi();

  const [bill, setBill] = useState<Bill>();

  useEffect(() => {
    if (params.id) {
      getBill(Number(params.id))
        .then((response) => {
          if (response.data !== null) {
            setBill(response.data);
          } else {
            errorNotify(response.message);
          }
        })
        .catch((e) => errorNotify(e.message));
    }
    // eslint-disable-next-line
  }, [params.id]);

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 12 }}>
      <Link to="/">
        <Button>
          <ArrowBackIcon sx={{ fontSize: "40px", fontWeight: 700 }} />
        </Button>
      </Link>
      <List>
        <Box>
          <ListSubheader>Thông tin người mua:</ListSubheader>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Tên người nhận:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {bill?.info.name}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Email người nhận:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {bill?.info.email}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Số điện thoại:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {bill?.info.tel}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              Địa chỉ nhận:
              <Typography variant="h6" color="#34aadc" mt={1}>
                {bill?.info.address}
              </Typography>
            </Grid>
          </Grid>
          <ListSubheader>Thông tin sản phẩm đã mua:</ListSubheader>
          <React.Fragment>
            {bill?.listProducts.map((item) => (
              <BillBookItem key={item.id} props={{ cartItem: item }} />
            ))}
          </React.Fragment>
        </Box>
      </List>
    </Box>
  );
};

export default BillDetail;
