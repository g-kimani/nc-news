import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";

export default function ArticleCard({ article, setArticle }) {
  const setArticleVotes = (votes) => {
    setArticle((article) => {
      return { ...article, votes: article.votes + votes };
    });
  };
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
        <ArticleVotes
          article_id={article.article_id}
          votes={article.votes}
          setVotes={setArticleVotes}
        />
        <Link to={`/articles/${article.article_id}`}>
          <Button>See More...</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
