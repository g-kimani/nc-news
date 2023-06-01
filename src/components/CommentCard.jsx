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
import { formatDate } from "../utils";
import CommentVotes from "./CommentVotes";

export default function CommentCard({ comment, setComment }) {
  const setCommentVotes = (votes) => {
    setComment((comment) => {
      return { ...comment, votes: comment.votes + votes };
    });
  };
  return (
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
            <CommentVotes
              comment_id={comment.comment_id}
              votes={comment.votes}
              setVotes={setCommentVotes}
            />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
