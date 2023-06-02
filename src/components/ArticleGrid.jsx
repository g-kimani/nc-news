import ArticleCard from "./ArticleCard";
import Pagination from "@mui/material/Pagination";
import { getArticles } from "../utils/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
  Grid,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

export default function ArticleGrid({ topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const [order, setOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("created_at");
  useEffect(() => {
    setIsLoading(true);
    getArticles(page, pageLimit, topic, order, sortBy)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotalPages(Math.ceil(total_count / pageLimit));
        setIsLoading(false);
      })
      .catch((err) => {
        navigate("/404");
      });
  }, [page, topic, order, sortBy]);
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleSetArticle = (index, setArticle) => {
    setArticles((articles) => {
      const newArticles = [...articles];
      newArticles[index] = setArticle(newArticles[index]);
      return newArticles;
    });
  };
  const toggleOrder = () => {
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <section>
        <Toolbar sx={{ padding: "1em" }}>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              width: "100%",
              padding: "1em",
            }}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">Sort by:</Typography>
              <Select value={sortBy} onChange={handleSortChange}>
                <MenuItem value="created_at">Date</MenuItem>
                <MenuItem value="comment_count">Comments</MenuItem>
                <MenuItem value="votes">Votes</MenuItem>
              </Select>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="h6">Order:</Typography>
              <Button variant="outlined" onClick={toggleOrder}>
                {order}
                {order === "asc" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
              </Button>
            </Stack>
          </Stack>
        </Toolbar>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          variant="outlined"
          color="secondary"
        />
        <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
          {articles.map((article, index) => {
            return (
              <Grid
                item
                xs={4}
                sm={4}
                md={3}
                key={index}
                sx={{ height: "450px", minWidth: "285px" }}
              >
                <ArticleCard
                  key={article.article_id}
                  article={article}
                  setArticle={(callback) => {
                    handleSetArticle(index, callback);
                  }}
                />
              </Grid>
            );
          })}
        </Grid>
      </section>
    </>
  );
}
