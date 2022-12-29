import { Box, Button, Grid, Tab, Tabs, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoIcon from "@mui/icons-material/Info";
import StarRateIcon from "@mui/icons-material/StarRate";
import React, { useEffect, useState } from "react";
import { Book, User } from "../../interface";
import { Link, useParams } from "react-router-dom";
import useBookApi from "../../hooks/useBookApi";
import { errorNotify, warningNotify } from "../../Notification";
import AddCartDialog from "../../components/AddCartDialog";
import CommentDiv from "../../components/CommentDiv";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BookDetail = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOpenDialog = () => {
    if (user === null) {
      warningNotify("Bạn cần đăng nhập để sử dụng tính năng này!");
    } else {
      setOpen(true);
    }
  };

  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const [bookInfo, setBookInfo] = useState<Book>();

  const params = useParams();

  const { getBook } = useBookApi();

  const getBookInfo = (id: number) => {
    getBook(id)
      .then((response) => {
        if (response.data != null) {
          const _book = response.data;
          setBookInfo(_book);
        } else {
          window.location.href = window.location.pathname + "/page-not-found";
        }
      })
      .catch((err) => errorNotify(err.message));
  };

  useEffect(() => {
    if (params.id) {
      getBookInfo(Number(params.id));
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
      <Grid container spacing={2}>
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
                width: "500px",
                height: "500px",
                objectFit: "contain",
                p: 1,
                backgroundColor: "#c5dcff",
                borderRadius: "5px",
              }}
              src={bookInfo?.image?.url}
            />
            <Typography align="center" mt={3} variant="h4" color="darkgreen">
              {bookInfo?.title}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                icon={<InfoIcon />}
                iconPosition="start"
                label="Thông Tin Sản Phẩm"
                {...a11yProps(0)}
              />
              <Tab
                label="Đánh Giá"
                icon={<StarRateIcon />}
                iconPosition="start"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <React.Fragment>
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
                      {bookInfo?.title}
                    </Grid>
                    <Grid item xs={1}>
                      {bookInfo?.author}
                    </Grid>
                    <Grid item xs={1}>
                      {bookInfo?.date}
                    </Grid>
                    <Grid item xs={1}>
                      {bookInfo?.page}
                    </Grid>
                    <Grid item xs={1}>
                      {bookInfo?.category.label}
                    </Grid>
                    <Grid item xs={1}>
                      {formatter.format(bookInfo?.price!)}
                    </Grid>
                    <Grid item xs={6}>
                      {bookInfo?.description}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    sx={{ fontWeight: 700, mt: 3 }}
                    onClick={handleOpenDialog}
                  >
                    Thêm Vào Giỏ Hàng
                  </Button>
                </Grid>
              </Grid>
              <AddCartDialog
                props={{
                  open: open,
                  setOpen: setOpen,
                  bookInfo: bookInfo ? bookInfo : ({} as Book),
                }}
              />
            </React.Fragment>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CommentDiv props={{ book: bookInfo! }} />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookDetail;
