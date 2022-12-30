import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import PaymentsIcon from "@mui/icons-material/Payments";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../../context/BookContext";
import BookItem from "../../components/BookItem";
import { User } from "../../interface";
import ListBill from "../client/ListBill";

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

const ListBooks = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { books } = useContext(BookContext);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 12 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab
            icon={<BookmarksIcon />}
            iconPosition="start"
            label="Quản lý sách"
            {...a11yProps(0)}
          />
          <Tab
            label="Quản lý đơn hàng"
            icon={<PaymentsIcon />}
            iconPosition="start"
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <React.Fragment>
          <Box
            sx={{
              textTransform: "capitalize",
              fontWeight: 900,
              color: "darkblue",
            }}
          >
            <Typography variant="h4">Danh sách các quyển sách</Typography>
          </Box>
          <CssBaseline />
          {user && (
            <Grid container justifyContent="flex-end">
              <Grid item xs={2}>
                <Link
                  to="/admin/add"
                  style={{ color: "darkblue", textDecoration: "none" }}
                >
                  <Button variant="outlined" size="large">
                    Thêm sách
                  </Button>
                </Link>
              </Grid>
            </Grid>
          )}
          <Grid
            container
            sx={{
              borderRadius: 5,
              padding: 2,
              fontWeight: 900,
              textTransform: "capitalize",
            }}
            mt={2}
            alignItems="center"
          >
            <Grid item xs={1}>
              STT
            </Grid>
            <Grid item xs={2}>
              Tên sách
            </Grid>
            <Grid item xs={1}>
              Tác giả
            </Grid>
            <Grid item xs={1}>
              Ngày XB
            </Grid>
            <Grid item xs={1}>
              Số trang
            </Grid>
            <Grid item xs={3}>
              Mô tả
            </Grid>
            <Grid item xs={1}>
              Thể loại
            </Grid>
            {user && <Grid item xs={2}></Grid>}
          </Grid>
          {books.map((item, index) => {
            return <BookItem key={item.id} book={item} index={index} />;
          })}
        </React.Fragment>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ListBill />
      </TabPanel>
    </Box>
  );
};

export default ListBooks;
