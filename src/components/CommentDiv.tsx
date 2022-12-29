import { Box, Button, Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import useCommentApi from "../hooks/useCommentApi";
import { Book, Comment } from "../interface";
import { errorNotify } from "../Notification";
import CommentItem from "./CommentItem";

const useStyles = makeStyles({
  root: {
    "&::-webkit-scrollbar": {
      width: 7,
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3498db",
      outline: `1px solid #3498db`,
    },
  },
});

interface Props {
  book: Book;
}

const CommentDiv = ({ props }: { props: Props }) => {
  const classes = useStyles();

  const { getAllCommentOfBook } = useCommentApi();

  const [comments, setComments] = useState<Array<Comment>>([]);
  const [loadComment, setLoadComment] = useState<boolean>(false);

  useEffect(() => {
    getAllCommentOfBook(props.book.id)
      .then((response) => {
        if (response.data !== null) {
          setComments(response.data);
        } else {
          errorNotify(response.message);
          setComments([]);
        }
      })
      .catch((e) => errorNotify(e.message));
    // eslint-disable-next-line
  }, [loadComment]);

  return (
    <React.Fragment>
      <Box maxWidth="800px" height="460px">
        <Box
          className={classes.root}
          height="90%"
          sx={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          <Grid container>
            {comments.map((item) => (
              <Grid
                key={item.id}
                item
                xs={12}
                sx={{ borderBottom: "1px solid #ccc" }}
              >
                <CommentItem props={{ commentItem: item }} />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          height="10%"
          p={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderTop="1px solid #ccc"
        >
          <Button variant="outlined" sx={{ width: "200px" }}>
            Đánh giá sách
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default CommentDiv;
