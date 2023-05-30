import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";

export default function ArticleCard({ article }) {
  return (
    <Card sx={{ maxWidth: 345, margin: "5px" }}>
      <CardMedia
        component="img"
        alt={article.title}
        image={article.article_img_url}
        title={article.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(article.created_at).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
          <ModeCommentOutlinedIcon />
          {article.comment_count}
        </Button>
        <Button size="small">
          <FavoriteBorderOutlinedIcon />
          {article.votes}
        </Button>
      </CardActions>
    </Card>
  );
}