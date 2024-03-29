import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import React, { useState } from "react";
import { Book, User } from "../interface";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import AddCartDialog from "./AddCartDialog";
import { warningNotify } from "../Notification";

interface BookCardProps {
  bookInfo: Book;
}

const BookCard = ({ props }: { props: BookCardProps }) => {
  const user: User = JSON.parse(localStorage.getItem("login")!);
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleOpenDialog = () => {
    if (user === null) {
      warningNotify("Bạn cần đăng nhập để sử dụng tính năng này!");
    } else {
      setOpen(true);
    }
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          maxWidth: 400,
          boxShadow:
            "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;",
        }}
      >
        <CardMedia
          component="img"
          height="200"
          alt=""
          src={props.bookInfo.image?.url}
          sx={{
            objectFit: "scale-down",
            p: 1,
            backgroundColor: "#c5dcff",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <span
              className="d-inline-block text-truncate"
              style={{ maxWidth: "300px" }}
            >
              <Link
                to={`/book/${props.bookInfo.id}`}
                style={{
                  color: "darkgreen",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                {props.bookInfo.title}
              </Link>
            </span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <span
              className="d-inline-block text-truncate"
              style={{ maxWidth: "300px" }}
            >
              {props.bookInfo.description}
            </span>
          </Typography>
        </CardContent>
        <CardActions sx={{ borderTop: "1px solid #ccc", paddingTop: 2 }}>
          <Box width={"50%"} ml={3}>
            <Chip
              label={formatter.format(props.bookInfo.price)}
              color="error"
              variant="outlined"
              avatar={<PaidIcon sx={{ fill: "darkred" }} />}
              sx={{ fontWeight: 700 }}
            />
          </Box>
          <Box width={"50%"} ml={3}>
            <Button variant="outlined" onClick={handleOpenDialog}>
              Thêm vào giỏ
            </Button>
          </Box>
        </CardActions>
      </Card>
      <AddCartDialog
        props={{
          open: open,
          setOpen: setOpen,
          bookInfo: props.bookInfo,
        }}
      />
    </React.Fragment>
  );
};

export default BookCard;
