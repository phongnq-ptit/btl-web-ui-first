import {
  Box,
  Button,
  Chip,
  Grid,
  List,
  ListSubheader,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Bill, BillStatus } from "../../interface";
import useBillApi from "../../hooks/useBillApi";
import { errorNotify, successNotify } from "../../Notification";
import BillBookItem from "../../components/BillBookItem";
import StyledDialog from "../../components/StyledDialog";

const BillDetail = () => {
  const params = useParams();
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const { getBill, updateBillStatus } = useBillApi();

  const [bill, setBill] = useState<Bill>();
  const [totalBill, setTotalBill] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleUpdateStatus = (status: BillStatus) => {
    updateBillStatus(bill?.id!, status)
      .then((response) => {
        if (response.data !== null) {
          successNotify(`Thay đổi trạng thái đơn hàng thành công!`);
          setReload(!reload);
        } else {
          errorNotify(response.message);
        }
      })
      .finally(() => {
        setOpenDialog(false);
      });
  };

  useEffect(() => {
    if (params.id) {
      getBill(Number(params.id))
        .then((response) => {
          if (response.data !== null) {
            setBill(response.data);
            setTotalBill(
              response.data.listProducts.reduce((sum, currVal) => {
                return sum + currVal.books.price * currVal.quantity;
              }, 0)
            );
          } else {
            setTotalBill(0);
            errorNotify(response.message);
          }
        })
        .catch((e) => errorNotify(e.message));
    }
    // eslint-disable-next-line
  }, [params.id, reload]);

  const colorChip = () => {
    switch (bill?.status) {
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
    <React.Fragment>
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
              <Grid item xs={2}>
                Tên người nhận:
                <Typography variant="h6" color="#34aadc" mt={1}>
                  {bill?.info.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                Email người nhận:
                <Typography variant="h6" color="#34aadc" mt={1}>
                  {bill?.info.email}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                Số điện thoại:
                <Typography variant="h6" color="#34aadc" mt={1}>
                  {bill?.info.tel}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                Địa chỉ nhận:
                <Typography variant="h6" color="#34aadc" mt={1}>
                  {bill?.info.address}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                Tổng giá trị đơn hàng:
                <Typography variant="h6" color="#34aadc" mt={1}>
                  {formatter.format(totalBill)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                Trạng thái:
                <Box mt={1}>
                  <Chip
                    label={bill?.status}
                    size="small"
                    color={colorChip()}
                    variant="filled"
                  />
                </Box>
              </Grid>
            </Grid>
            <ListSubheader>Thông tin sản phẩm đã mua:</ListSubheader>
            <React.Fragment>
              {bill?.listProducts.map((item) => (
                <BillBookItem key={item.id} props={{ cartItem: item }} />
              ))}
            </React.Fragment>
            <Box my={2} display="flex" justifyContent="center">
              {bill?.status === BillStatus.PENDING && (
                <Button
                  variant="outlined"
                  color={colorChip()}
                  onClick={() => setOpenDialog(true)}
                >
                  Hủy đơn hàng
                </Button>
              )}
            </Box>
          </Box>
        </List>
      </Box>
      <StyledDialog
        props={{
          open: openDialog,
          setOpen: setOpenDialog,
          title: "Hãy xác nhận",
          content: "Bạn có muốn thay đổi trạng thái đơn hàng?",
          handleClickOk: () => handleUpdateStatus(BillStatus.CANCEL),
        }}
      />
    </React.Fragment>
  );
};

export default BillDetail;
