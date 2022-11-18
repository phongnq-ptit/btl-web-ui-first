import { Box, Button, CssBaseline, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../BookContext";
import BookItem from "../components/BookItem";
import { User } from "../interface";

const ListBooks = () => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { books } = useContext(BookContext);

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 12 }}>
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
              to="/add"
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
    </Box>
  );
};

export default ListBooks;
