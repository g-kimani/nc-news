import { useEffect, useState } from "react";
import { getArticles } from "../utils";
import ArticleGrid from "./ArticleGrid";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getArticles().then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, []);
  if (isLoading) return <p>Loading</p>;
  return (
    <>
      <h1>NC News</h1>
      <section>
        <ArticleGrid articles={articles} />
      </section>
    </>
  );
}
