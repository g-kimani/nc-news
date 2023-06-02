import ArticleCard from "./ArticleCard";
import Pagination from "@mui/material/Pagination";
import { getArticles } from "../utils";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ArticleGrid({ topic }) {
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
    getArticles(page, pageLimit, topic)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotalPages(Math.ceil(total_count / pageLimit));
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        navigate("/404");
      });
  }, [page, topic]);
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
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          variant="outlined"
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
