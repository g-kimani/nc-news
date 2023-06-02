import { useEffect, useState } from "react";
import { getArticle, getArticles, getTopics } from "../utils";
import ArticleGrid from "./ArticleGrid";
import Pagination from "@mui/material/Pagination";
import "../components.css";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ArticleVotes from "./ArticleVotes";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";

export default function Home() {
  const [breakingNews, setBreakingNews] = useState({});
  const [topics, setTopics] = useState([]);
  const [totalArticles, setTotalArticles] = useState(0);
  useEffect(() => {
    // get the topics and counts for each topic
    getTopics()
      .then(({ topics }) => {
        const getTopicCounts = topics.map(({ slug }) =>
          getArticles(1, 1, slug)
        );
        setTopics(topics);
        return Promise.all(getTopicCounts);
      })
      .then((results) => {
        setTopics((t) => {
          const newTopics = [...t];
          newTopics.forEach((topic, index) => {
            topic.total_count = results[index].total_count;
          });
          return newTopics;
        });
        console.log(topics);
      });
    // get only the most recent article
    getArticles(1, 1)
      .then(({ articles, total_count }) => {
        setTotalArticles(total_count);
        return getArticle(articles[0].article_id);
      })
      .then(({ article }) => {
        setBreakingNews(article);
      });
  }, []);
  return (
    <>
      <Stack direction={{ sm: "row", xs: "column" }} spacing={2}>
        <Card sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            alt={breakingNews.title}
            image={breakingNews.article_img_url}
            title={breakingNews.title}
          />
          <Paper sx={{ position: "absolute", top: 0, left: 0 }} square>
            <Typography variant="h5" sx={{ textTransform: "uppercase" }}>
              B<span style={{ fontSize: "0.7em" }}>reaking</span> N
              <span style={{ fontSize: "0.7em" }}>ews</span>
            </Typography>
          </Paper>
          <Card
            sx={{
              position: { sm: "absolute" },
              left: 10,
              bottom: 10,
              height: { sm: "50%" },
              backgroundColor: "#fffffff0",
              maxWidth: { sm: "75%" },
            }}
            square
          >
            <CardContent sx={{ textAlign: "left" }}>
              <Typography variant="h5" gutterBottom>
                {breakingNews.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(breakingNews.created_at).toDateString()}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}
                gutterBottom
              >
                {breakingNews.body}
              </Typography>
              <Stack
                direction="row"
                sx={{ marginTop: "1em", height: "100%", width: "100%" }}
                justifyContent="space-between"
              >
                <Link to={`/articles/${breakingNews.article_id}#comments`}>
                  <Button size="small">
                    <ModeCommentOutlinedIcon sx={{ marginRight: "0.2em" }} />
                    {breakingNews.comment_count}
                  </Button>
                </Link>
                <ArticleVotes
                  article_id={breakingNews.article_id}
                  votes={breakingNews.votes}
                  setVotes={(votes) => {
                    setBreakingNews((n) => {
                      return { ...n, votes: n.votes + votes };
                    });
                  }}
                />
                <Link to={`/articles/${breakingNews.article_id}`}>
                  <Button>More...</Button>
                </Link>
              </Stack>
            </CardContent>
          </Card>
        </Card>
        <Stack
          justifyContent="space-between"
          sx={{ textAlign: "left" }}
          spacing={{ xs: 2 }}
        >
          <Card>
            <CardContent>
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                <Typography variant="h5">See All Articles</Typography>
                <Link to="/articles">
                  <Button>
                    <ArticleOutlinedIcon sx={{ verticalAlign: "middle" }} />
                    {totalArticles}
                  </Button>
                </Link>
              </Stack>
            </CardContent>
          </Card>
          <Divider>Topics</Divider>
          {topics.map(({ slug, description, total_count }) => {
            return (
              <Card key={slug}>
                <CardContent>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <div>
                      <Typography
                        variant="h5"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {slug}
                      </Typography>
                      <Typography variant="subtitle2">{description}</Typography>
                    </div>
                    <Link to={`/topics/${slug}`}>
                      <Button>
                        <ArticleOutlinedIcon sx={{ verticalAlign: "middle" }} />
                        {total_count}
                      </Button>
                    </Link>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}
