import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useContext, useState } from "react";
import { postArticleComment } from "../utils";
import { UserContext } from "../contexts/UserContext";
import { TextField } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CommentForm({ article_id, addComment }) {
  const { user } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = () => {
    if (body.length === 0) {
      setError(true);
      return;
    }
    const comment = { username: user.username, body };
    postArticleComment(article_id, comment)
      .then(({ comment }) => {
        addComment(comment);
        setBody("");
        setMessage(<Alert severity="success">Comment Posted!</Alert>);
        setMessageOpen(true);
      })
      .catch(() => {
        setMessage(
          <Alert severity="error">
            There was an error posting your comment! Try again
          </Alert>
        );
        setMessageOpen(true);
      });
  };
  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setMessageOpen(false);
  };
  return (
    <>
      <section>
        <TextField
          id="outlined-multiline-static"
          label="Comment Body"
          multiline
          error={error}
          rows={4}
          value={body}
          required
          onChange={(event) => {
            setBody(event.target.value);
            setError(false);
          }}
        />
        <Button onClick={handleSubmit}>Post</Button>
      </section>
      <Snackbar
        open={messageOpen}
        autoHideDuration={3000}
        onClose={handleMessageClose}
      >
        {message}
      </Snackbar>
    </>
  );
}
