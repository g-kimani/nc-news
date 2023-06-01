import {
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";
import UserAvatar from "./UserAvatar";
import { deleteCommentById, formatDate } from "../utils";
import CommentVotes from "./CommentVotes";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ShowMessage from "./ShowMessage";

export default function CommentCard({ comment, setComment, deleteComment }) {
  const { user } = useContext(UserContext);
  const [disableDelete, setDisableDelete] = useState(true);
  const [message, setMessage] = useState({
    open: false,
    text: "",
    severity: "success",
  });
  const setCommentVotes = (votes) => {
    setComment((comment) => {
      return { ...comment, votes: comment.votes + votes };
    });
  };

  useEffect(() => {
    if (user.username === comment.author) {
      setDisableDelete(false);
    }
  }, []);
  const handleDelete = () => {
    setDisableDelete(true);
    deleteCommentById(comment.comment_id)
      .then(() => {
        deleteComment();
      })
      .catch(() => {
        setMessage((prev) => {
          return {
            open: true,
            severity: "error",
            text: "There was an error deleting the message. Try Again.",
          };
        });
        setDisableDelete(false);
      });
  };
  const handleCloseMessage = () => {
    setMessage((prev) => {
      return { ...prev, open: false };
    });
  };
  return (
    <>
      <Card sx={{ textAlign: "left", margin: "1em" }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <UserAvatar username={comment.author} />
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="subtitle1">@{comment.author}</Typography>
                <Typography variant="subtitle2">
                  {formatDate(new Date(comment.created_at))}
                </Typography>
              </Stack>
              <Divider variant="middle" />
              <Typography variant="body1">{comment.body}</Typography>
              <Stack direction="row" spacing={2}>
                <CommentVotes
                  comment_id={comment.comment_id}
                  votes={comment.votes}
                  setVotes={setCommentVotes}
                />
                <Button
                  disabled={disableDelete}
                  onClick={handleDelete}
                  sx={{
                    display:
                      comment.author === user.username ? "block" : "none",
                  }}
                >
                  <DeleteOutlinedIcon
                    sx={{ color: disableDelete ? "grey" : "red" }}
                  />
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
      <ShowMessage message={message} close={handleCloseMessage} />
    </>
  );
}
