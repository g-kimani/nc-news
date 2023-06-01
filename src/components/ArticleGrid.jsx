import ArticleCard from "./ArticleCard";
import Pagination from "@mui/material/Pagination";
import { getArticles } from "../utils";
import { useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

export default function ArticleGrid({ topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  const [order, setOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("created_at");
  useEffect(() => {
    setIsLoading(true);
    getArticles(page, pageLimit, topic, order, sortBy).then(
      ({ articles, total_count }) => {
        setArticles(articles);
        setTotalPages(Math.ceil(total_count / pageLimit));
        setIsLoading(false);
      }
    );
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
            alignItems="center"
            spacing={2}
            sx={{ marginLeft: "auto" }}
          >
            <Typography variant="h6">Sort by:</Typography>
            <Select value={sortBy} onChange={handleSortChange}>
              <MenuItem value="created_at">Date</MenuItem>
              <MenuItem value="comment_count">Comments</MenuItem>
              <MenuItem value="votes">Votes</MenuItem>
            </Select>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="h6">Order:</Typography>
            <Button onClick={toggleOrder}>{order}</Button>
          </Stack>
        </Toolbar>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          variant="outlined"
        />
        <section className="article-grid">
          {articles.map((article, index) => {
            return (
              <ArticleCard
                key={article.article_id}
                article={article}
                setArticle={(callback) => {
                  handleSetArticle(index, callback);
                }}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}
