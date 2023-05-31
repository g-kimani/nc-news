import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArticle } from "../utils";
import Button from "@mui/material/Button";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

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
  if (isLoading) return <p>Loading...</p>;
  return (
    <article>
      <div>
        <p>{article.topic}</p>
        <h2>{article.title}</h2>
        <p>{article.author}</p>
        <p>
          {new Date(article.created_at).toDateString()}
          <span>
            <Button size="small">
              <FavoriteBorderOutlinedIcon />
              {article.votes}
            </Button>
          </span>
        </p>
      </div>
      <div>
        <p>{article.body}</p>
      </div>
    </article>
  );
}
