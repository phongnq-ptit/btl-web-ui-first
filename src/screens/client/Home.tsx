import { Box, Grid } from "@mui/material";
import React, { useContext } from "react";
import { BookContext } from "../../BookContext";
import BookCard from "../../components/BookCard";

const Home = () => {
  const { books } = useContext(BookContext);

  return (
    <Box sx={{ width: "85%", margin: "0 auto", pt: 12 }}>
      <Box sx={{ width: "100%", typography: "body1" }}></Box>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item xs={3}>
            <BookCard key={book.id} props={{ bookInfo: book }} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
