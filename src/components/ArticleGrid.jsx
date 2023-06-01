import ArticleCard from "./ArticleCard";
import Pagination from "@mui/material/Pagination";
import { getArticles } from "../utils";
import { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";

export default function ArticleGrid({ topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    getArticles(page, pageLimit).then(({ articles, total_count }) => {
      setArticles(articles);
      setTotalPages(Math.ceil(total_count / pageLimit));
      setIsLoading(false);
    });
  }, [page]);
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
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <section>
        <Toolbar sx={{ backgroundColor: "#e5f3ff" }}>Hi</Toolbar>
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
