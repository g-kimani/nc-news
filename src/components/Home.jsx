import { useEffect, useState } from "react";
import { getArticles } from "../utils";
import ArticleGrid from "./ArticleGrid";
import Pagination from "@mui/material/Pagination";
import "../components.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

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
  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <h1>NC News</h1>
      <section>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
        <ArticleGrid articles={articles} />
      </section>
    </>
  );
}
