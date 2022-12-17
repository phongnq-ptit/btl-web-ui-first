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
import React from "react";
import { Book } from "../interface";
import { Box } from "@mui/system";

interface BookCardProps {
  bookInfo: Book;
}

const BookCard = ({ props }: { props: BookCardProps }) => {
  const formatter = new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });

  return (
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
        sx={{ objectFit: "scale-down" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: "300px" }}
          >
            {props.bookInfo.title}
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
          <Button variant="outlined">Thêm vào giỏ</Button>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BookCard;
