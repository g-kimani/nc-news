import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../utils";
import ArticleGrid from "./ArticleGrid";

export default function TopicPage() {
  const { topic } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getArticlesByTopic(topic).then(({ articles }) => {
      setArticles(articles);
      setIsLoading(false);
    });
  }, [topic]);
  if (isLoading) return <p>Is loading topic: {topic}</p>;
  return (
    <>
      <ArticleGrid articles={articles} setArticles={setArticles} />
    </>
  );
}
