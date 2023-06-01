import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import * as React from "react";
import { useContext, useState } from "react";
import { postArticleComment } from "../utils";
import { UserContext } from "../contexts/UserContext";
import { Card, Stack, TextField } from "@mui/material";
import UserAvatar from "./UserAvatar";
import ShowMessage from "./ShowMessage";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CommentForm({ article_id, addComment }) {
  const { user } = useContext(UserContext);
  const [body, setBody] = useState("");
  const [message, setMessage] = useState({
    open: false,
    time: 3000,
    text: "",
  });
  const [error, setError] = useState(false);
  const [disablePost, setDisablePost] = useState(false);
  const handleSubmit = () => {
    if (body.length === 0) {
      setError(true);
      return;
    }
    const comment = { username: user.username, body };
    setDisablePost(true);
    postArticleComment(article_id, comment)
      .then(({ comment }) => {
        addComment(comment);
        setBody("");
        setMessage({ open: true, text: "Comment Posted", severity: "success" });
        setDisablePost(false);
      })
      .catch(() => {
        setMessage({
          open: true,
          text: "There was an error posting your comment! Try again",
          severity: "error",
        });
        setDisablePost(false);
      });
  };
  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessage((prevM) => {
      return { ...prevM, open: false };
    });
  };
  return (
    <>
      <section>
        <Card sx={{ padding: "1em" }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <UserAvatar username={user.username} />
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
              sx={{ width: "100%" }}
            />
            <Button disabled={disablePost} onClick={handleSubmit}>
              Post
            </Button>
          </Stack>
        </Card>
      </section>
      <ShowMessage message={message} close={handleMessageClose} />
    </>
  );
}
