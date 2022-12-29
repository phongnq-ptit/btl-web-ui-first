import { Avatar, Box, Grid, Rating, Typography } from "@mui/material";
import React from "react";
import { Comment } from "../interface";

interface Props {
  commentItem: Comment;
}

const CommentItem = ({ props }: { props: Props }) => {
  return (
    <Grid container spacing={2} py={1}>
      <Grid item xs={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              width: 60,
              height: 60,
              color: "#fff",
              fontSize: 32,
              fontWeight: 700,
              backgroundColor: "darkgreen",
            }}
          >
            {props.commentItem.user.name[0]}
          </Avatar>

          <Typography sx={{ fontWeight: 700, color: "darkcyan" }}>
            {props.commentItem.user.name}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item xs={6}>
                <Rating
                  name="read-only"
                  defaultValue={props.commentItem.rate}
                  readOnly
                />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2">
                  {props.commentItem.date}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" sx={{ fontSize: 18 }}>
              {props.commentItem.comment}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentItem;
