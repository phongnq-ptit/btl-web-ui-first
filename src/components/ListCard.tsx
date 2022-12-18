import { Grid } from "@mui/material";
import React, { useContext } from "react";
import { BookContext } from "../context/BookContext";
import BookCard from "./BookCard";

const ListCard = () => {
  const { books } = useContext(BookContext);
  return (
    <Grid container spacing={3}>
      {books.map((book) => (
        <Grid item xs={3} key={book.id}>
          <BookCard props={{ bookInfo: book }} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListCard;
