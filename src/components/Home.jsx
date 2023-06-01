import { useEffect, useState } from "react";
import { getArticles } from "../utils";
import ArticleGrid from "./ArticleGrid";
import Pagination from "@mui/material/Pagination";
import "../components.css";

export default function Home() {
  const [articles, setArticles] = useState([]);

  return (
    <>
      <section>
        <ArticleGrid articles={articles} setArticles={setArticles} />
      </section>
    </>
  );
}
