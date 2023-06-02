import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArticleVotes from "./ArticleVotes";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { CardActionArea, Divider, Stack } from "@mui/material";

export default function ArticleCard({ article, setArticle }) {
  const setArticleVotes = (votes) => {
    setArticle((article) => {
      return { ...article, votes: article.votes + votes };
    });
  };
  return (
    <Card sx={{ maxWidth: 345, margin: "5px", height: "100%" }}>
      <Stack justifyContent="space-between" height="100%">
        <Link
          to={`/articles/${article.article_id}`}
          style={{ color: "inherit" }}
        >
          <CardActionArea>
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
            <Divider></Divider>
          </CardActionArea>
        </Link>
        <CardActions>
          <Stack
            direction="row"
            sx={{ marginTop: "auto", height: "100%", width: "100%" }}
            justifyContent="space-between"
          >
            <Link to={`/articles/${article.article_id}#comments`}>
              <Button size="small">
                <ModeCommentOutlinedIcon sx={{ marginRight: "0.2em" }} />
                {article.comment_count}
              </Button>
            </Link>
            <ArticleVotes
              article_id={article.article_id}
              votes={article.votes}
              setVotes={setArticleVotes}
            />
            <Link to={`/articles/${article.article_id}`}>
              <Button>More...</Button>
            </Link>
          </Stack>
        </CardActions>
      </Stack>
    </Card>
  );
}
