import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useCommentApi from "../hooks/useCommentApi";
import { User } from "../interface";
import { errorNotify, successNotify, warningNotify } from "../Notification";

interface Props {
  open: boolean;
  setOpen: Function;
  bookId: number;
  loadComment: boolean;
  setLoadComment: Function;
}

const CommentDialog = ({ props }: { props: Props }) => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const { createComment } = useCommentApi();

  const handleClose = () => {
    setDescription("");
    setRate(1);
    props.setOpen(false);
  };

  const [rate, setRate] = useState<number | null>(1);
  const [description, setDescription] = useState<string>("");

  const handleOk = () => {
    if (description === "") {
      warningNotify("Bạn cần nhập nội dụng để có thể đánh giá sản phẩm!");
      return;
    }

    const date = new Date().toLocaleString("it-IT", {
      timeZone: "Asia/Ho_Chi_Minh",
    });

    createComment({
      userId: user.id,
      bookId: props.bookId,
      rate: rate!,
      comment: description,
      date: date,
    })
      .then((response) => {
        if (response.data !== null) {
          successNotify("Thêm đánh giá thành công!");
          props.setLoadComment(!props.loadComment);
        } else {
          errorNotify(response.message);
        }
      })
      .catch((e) => errorNotify(e.message))
      .finally(() => {
        props.setOpen(false);
        setRate(1);
        setDescription("");
      });
  };

  return (
    <Dialog
      open={props.open}
      aria-labelledby="customized-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
      PaperProps={{
        style: {
          borderRadius: 20,
          boxShadow: "none",
        },
      }}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: 700,
          textTransform: "capitalize",
        }}
      >
        Đánh giá sách
      </DialogTitle>
      <DialogContent sx={{ padding: 3, mt: 3 }}>
        <Box width={500}>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <Typography component="legend">Số sao:</Typography>
              <Rating
                name="simple-controlled"
                value={rate}
                onChange={(event, newValue) => {
                  setRate(newValue);
                }}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Nhận xét"
                multiline
                rows={7}
                fullWidth
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #ccc", paddingTop: 2 }}>
        <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
          Đóng
        </Button>
        <Button variant="contained" onClick={handleOk}>
          Đánh giá
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentDialog;
