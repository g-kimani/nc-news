import { useEffect, useState } from "react";
import { getArticle, getArticles, getTopics } from "../utils/utils";
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
  const [isLoading, setIsLoading] = useState(true);
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
      })
      .finally(() => {
        setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="h-full mt-20  sm:px-20 flex flex-col sm:flex-row gap-2">
        <Card className="relative animate-pulse h-full w-full min-h-[605px] bg-gray-200 rounded shadow-md p-4"></Card>
        <Stack
          justifyContent="space-between"
          sx={{ textAlign: "left" }}
          spacing={{ xs: 2 }}
        >
          <Card className="animate-pulse bg-gray-200 w-full sm:min-w-[360px] min-h-[76px]"></Card>
          <Divider className="text-white before:border-yellow-theme after:border-yellow-theme">
            Topics
          </Divider>
          {[1, 2, 3].map((i) => {
            return (
              <Card
                key={i}
                className="animate-pulse bg-gray-200 w-full sm:min-w-[360px] min-h-[75px]"
              ></Card>
            );
          })}
        </Stack>
      </div>
    );
  }

  return (
    <>
      <Stack
        className="h-full mt-20 sm:px-20"
        direction={{ sm: "row", xs: "column" }}
        spacing={2}
      >
        <Card
          sx={{ position: "relative" }}
          className="h-full grow max-h-[38rem] m-0.5 overflow-hidden"
        >
          <CardMedia
            component="img"
            loading={isLoading}
            alt={breakingNews.title}
            image={breakingNews.article_img_url}
            title={breakingNews.title}
          />
          <Paper
            sx={{ position: "absolute", top: 10, left: 10 }}
            className="bg-charcoal text-white p-2 rounded font-semibold"
            square
          >
            <Typography
              variant="h5"
              sx={{ textTransform: "uppercase" }}
              className="font-semibold"
            >
              B<span style={{ fontSize: "0.7em" }}>reaking</span> N
              <span style={{ fontSize: "0.7em" }}>ews</span>
            </Typography>
          </Paper>
          <Card
            sx={{
              position: { sm: "absolute" },
              left: 10,
              bottom: 10,
              height: { sm: "40%" },
              backgroundColor: "#fffffff0",
              maxWidth: { sm: "55%" },
            }}
            className="bg-charcoal/90 text-white rounded"
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
                  WebkitLineClamp: "3",
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
                  <Button
                    size="small"
                    className="text-white hover:text-black hover:bg-yellow-theme rounded-md transition-all duration-300"
                  >
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
                  <Button className="text-white hover:text-black hover:bg-yellow-theme rounded-md transition-all duration-300 font-semibold">
                    More...
                  </Button>
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
          <Link to="/articles">
            <Card>
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  className="items-center"
                  spacing={1}
                >
                  <Typography
                    variant="h5"
                    className="text-2xl font-bold tracking-tight text-gray-900"
                  >
                    See All Articles
                  </Typography>
                  <Button className="text-black hover:text-black hover:bg-yellow-theme rounded-md transition-all duration-300">
                    <ArticleOutlinedIcon sx={{ verticalAlign: "middle" }} />
                    {totalArticles}
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Link>
          <Divider className="text-white before:border-yellow-theme after:border-yellow-theme">
            Topics
          </Divider>
          {topics.map(({ slug, description, total_count }) => {
            return (
              <Link to={`/topics/${slug}`}>
                <Card key={slug}>
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      spacing={1}
                      className="items-center"
                    >
                      <div>
                        <Typography
                          variant="h5"
                          className="text-2xl font-bold tracking-tight text-gray-900"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {slug}
                        </Typography>
                        <Typography variant="subtitle2">
                          {description}
                        </Typography>
                      </div>
                      <Button className="text-black hover:text-black hover:bg-yellow-theme rounded-md transition-all duration-300">
                        <ArticleOutlinedIcon sx={{ verticalAlign: "middle" }} />
                        {total_count}
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </Stack>
      </Stack>
    </>
  );
}
