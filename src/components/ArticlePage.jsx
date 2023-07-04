import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils/utils";
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

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
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
        navigate("/404");
      });
  }, [article_id]);
  const handleSetVotes = (votes) => {
    setArticle((article) => {
      return { ...article, votes: article.votes + votes };
    });
  };
  if (isLoading) {
    return (
      <div className="article-content mt-16">
        <div className="w-full min-h-[560px] bg-gray-200 rounded animate-pulse"></div>
        <div className="mt-4">
          <h4
            id="comments"
            className="text-xl text-white font-bold tracking-tight sm:text-2xl"
          >
            Comments
          </h4>
          {[1, 2, 3, 4, 5].map((i) => {
            return (
              <div className="w-full min-h-[150px] bg-gray-200 animate-pulse rounded my-2 mx-2"></div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <article className="article-content mt-16">
      <Card className="text-left ">
        <Card className="relative ">
          <CardMedia
            component="img"
            alt={article.title}
            image={article.article_img_url}
            title={article.title}
            className="w-full max-h-[400px]"
          />
          <Card
            elevation={0}
            className="text-black p-4 gap-2 flex flex-col sm:text-white sm:absolute sm:bottom-10 sm:left-10 sm:bg-transparent sm:backdrop-blur"
          >
            {/* sm:text-white sm:absolute bottom-10 text-white p-2 left-10
            bg-transparent backdrop-blur */}
            <Link
              to={`/topics/${article.topic}`}
              style={{
                textDecoration: "underline",
                textTransform: "capitalize",
              }}
              className="text-inherit"
            >
              <Typography
                variant="subtitle2"
                className="font-semibold text-base"
              >
                {article.topic}
              </Typography>
            </Link>
            <h2 className="text-2xl font-bold tracking-tight sm:text-4xl">
              {article.title}
            </h2>
            <Stack
              direction={{ sm: "row" }}
              divider={
                <Divider
                  sx={{ borderColor: "white" }}
                  orientation={{ sm: "vertical" }}
                  flexItem
                  variant="middle"
                />
              }
              spacing={4}
              alignItems={{ sm: "center" }}
            >
              <Typography variant="subtitle1">
                {new Date(article.created_at).toDateString()}
              </Typography>
              <Typography variant="subtitle2" className="my-2">
                <Stack direction="row" spacing={2} alignItems="center">
                  <UserAvatar username={article.author} />
                  <span>By: {article.author}</span>
                </Stack>
              </Typography>
              <ArticleVotes
                article_id={article_id}
                votes={article.votes}
                setVotes={handleSetVotes}
              />
            </Stack>
          </Card>
        </Card>
        <CardContent>
          <p>{Math.floor(Math.random() * 2) + 1} Minute Read</p>
          <Typography sx={{ marginTop: "2em" }} variant="body1">
            {article.body}
          </Typography>
        </CardContent>
      </Card>
      <ArticleComments article_id={article_id} />
    </article>
  );
}
