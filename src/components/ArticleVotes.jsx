import { IconButton, Stack, SvgIcon } from "@mui/material";
import { updateArticle } from "../utils";
import { useState } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ArticleVotes({ article_id, votes, setVotes }) {
  const [errorOpen, setErrorOpen] = useState(false);
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setErrorOpen(false);
  };
  const handleUpVote = () => {
    setVotes(1);
    updateArticle(article_id, { incVotes: 1 }).catch(() => {
      setVotes(-1);
      setErrorOpen(true);
    });
  };
  const handleDownVote = () => {
    setVotes(-1);
    updateArticle(article_id, { incVotes: -1 }).catch(() => {
      setVotes(1);
      setErrorOpen(true);
    });
  };
  return (
    <>
      <Stack direction="row" alignItems="center">
        {votes}
        <IconButton title="up vote" onClick={handleUpVote}>
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              stroke="#000"
              strokeWidth="2"
              d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              fill="#fff"
            />
          </SvgIcon>
        </IconButton>
        <IconButton title="down vote" onClick={handleDownVote}>
          <SvgIcon>
            <path
              xmlns="http://www.w3.org/2000/svg"
              transform="rotate(180 12 12)"
              stroke="#000"
              strokeWidth="2"
              d="m5.6511,11.97544l6.3489,-10.20948l6.3489,10.20948l-3.17445,0l0,10.25861l-6.3489,0l0,-10.25861l-3.17445,0z"
              fill="#fff"
            />
          </SvgIcon>
        </IconButton>
      </Stack>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleErrorClose}
      >
        <Alert severity="error">
          There was an error voting! Please Try again.
        </Alert>
      </Snackbar>
    </>
  );
}
