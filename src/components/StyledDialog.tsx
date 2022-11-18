import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface Props {
  open: boolean;
  setOpen: Function;
  title: string;
  content: string;
  handleClickOk: Function;
}

const StyledDialog = ({ props }: { props: Props }) => {
  const handleClose = () => {
    props.setOpen(false);
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
          backgroundColor: "#ffa726",
          color: "white",
          fontWeight: 700,
          textTransform: "capitalize",
        }}
      >
        {props.title}
      </DialogTitle>
      <DialogContent sx={{ padding: 3, mt: 3 }}>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontWeight: 500 }}
        >
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ borderTop: "1px solid #ccc", paddingTop: 2 }}>
        <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
          Đóng
        </Button>
        <Button variant="contained" onClick={() => props.handleClickOk()}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StyledDialog;
