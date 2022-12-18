import { Button, Grid } from "@mui/material";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BookContext } from "../context/BookContext";
import useBookApi from "../hooks/useBookApi";
import { Book, User } from "../interface";
import { errorNotify, successNotify } from "../Notification";
import StyledDialog from "./StyledDialog";

const BookItem = ({ book, index }: { book: Book; index: number }) => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { isReload, setIsReload } = useContext(BookContext);
  const { deleteBook } = useBookApi();
  const [open, setOpen] = useState<boolean>(false);

  const handleRemove = () => {
    deleteBook(book.id)
      .then((response) => {
        if (response.data === "No content!") {
          successNotify(response.message);
          setIsReload(!isReload);
        } else {
          errorNotify(response.message);
        }
      })
      .catch((err) => errorNotify(err.message))
      .finally(() => {
        setOpen(false);
      });
  };

  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          borderRadius: 5,
          padding: 2,
          color: "darkblue",
          fontWeight: 900,
          textTransform: "capitalize",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
        mt={2}
        alignItems="center"
      >
        <Grid item xs={1}>
          {index + 1}.
        </Grid>
        <Grid item xs={2}>
          {book.title}
        </Grid>
        <Grid item xs={1}>
          {book.author}
        </Grid>
        <Grid item xs={1}>
          {book.date}
        </Grid>
        <Grid item xs={1}>
          {book.page}
        </Grid>
        <Grid item xs={3}>
          {book.description}
        </Grid>
        <Grid item xs={1}>
          {book.category.label}
        </Grid>
        {user && (
          <Grid item xs={2}>
            <Link
              style={{ color: "white", textDecoration: "none" }}
              to={`/admin/view/${book.id}`}
            >
              <Button
                sx={{ mr: 1, backgroundColor: "darkgreen" }}
                variant="contained"
              >
                Xem
              </Button>
            </Link>
            <Button
              sx={{ mr: 1, backgroundColor: "darkred" }}
              variant="contained"
              onClick={() => setOpen(true)}
            >
              Xóa
            </Button>
          </Grid>
        )}
      </Grid>
      {user && (
        <StyledDialog
          props={{
            open: open,
            setOpen: setOpen,
            title: "Hãy xác nhận",
            content: "Bạn có muốn xóa dữ liệu sách này không?",
            handleClickOk: handleRemove,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default BookItem;
