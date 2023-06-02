import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArticleComments from "./ArticleComments";
import ArticleVotes from "./ArticleVotes";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import NotFound from "./NotFound";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [articleMissing, setArticleMissing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id)
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setArticleMissing(true);
      });
  }, [article_id]);
  const handleSetVotes = (votes) => {
    setArticle((article) => {
      return { ...article, votes: article.votes + votes };
    });
  };
  if (articleMissing) return <NotFound message="Article not found" />;
  if (isLoading) return <p>Loading...</p>;
  return (
    <article className="article-content">
      <Card sx={{ textAlign: "left" }}>
        <Box sx={{ backgroundColor: "#213547", color: "#fff", padding: "1em" }}>
          <Link
            to={`/topics/${article.topic}`}
            style={{
              color: "#fff",
              textDecoration: "underline",
              textTransform: "capitalize",
            }}
          >
            <Typography variant="subtitle2">{article.topic}</Typography>
          </Link>
          <h2>{article.title}</h2>
          <Stack
            direction="row"
            divider={
              <Divider
                sx={{ borderColor: "white" }}
                orientation="vertical"
                flexItem
                variant="middle"
              />
            }
            spacing={2}
            alignItems="center"
          >
            <Typography variant="subtitle1">
              {new Date(article.created_at).toDateString()}
            </Typography>
            <Typography variant="subtitle2">
              <Stack direction="row" spacing={2} alignItems="center">
                <UserAvatar username={article.author} />
                <span>By: {article.author}</span>
              </Stack>
            </Typography>
          </Stack>
        </Box>

        <CardContent>
          <CardMedia
            component="img"
            alt={article.title}
            image={article.article_img_url}
            title={article.title}
            sx={{ width: "80%", margin: "1em auto" }}
          />
          <Divider />
          <Typography sx={{ marginTop: "2em" }} variant="body1">
            {article.body}
          </Typography>
        </CardContent>
      </Card>
      <ArticleComments article_id={article_id} />
    </article>
  );
}
