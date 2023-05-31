import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ArticleComments from "./ArticleComments";
import ArticleVotes from "./ArticleVotes";

export default function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getArticle(article_id).then(({ article }) => {
      setArticle(article);
      setIsLoading(false);
    });
  }, [article_id]);
  const handleSetVotes = (votes) => {
    setArticle((article) => {
      return { ...article, votes: article.votes + votes };
    });
  };
  if (isLoading) return <p>Loading...</p>;
  return (
    <article>
      <div>
        <p>{article.topic}</p>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
        <p>
          {new Date(article.created_at).toDateString()}
          <span></span>
        </p>
        <ArticleVotes
          article_id={article_id}
          votes={article.votes}
          setVotes={handleSetVotes}
        />
      </div>
      <div>
        <p>{article.body}</p>
      </div>
      <ArticleComments article_id={article_id} />
    </article>
  );
}
