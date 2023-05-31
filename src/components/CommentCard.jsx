import { Card, CardActions, CardContent } from "@mui/material";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";

export default function CommentCard({ comment }) {
  return (
    <Card>
      <CardContent>
        {comment.body}
        <p>{new Date(comment.created_at).toDateString()}</p>
      </CardContent>
      <CardActions>
        <Button size="small">
          <FavoriteBorderOutlinedIcon />
          {comment.votes}
        </Button>
      </CardActions>
    </Card>
  );
}
