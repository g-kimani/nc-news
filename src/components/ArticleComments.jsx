import { useEffect, useState } from "react";
import { getArticleComments } from "../utils";
import CommentCard from "./CommentCard";

export default function ArticleComments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id).then(({ comments }) => {
      setComments(comments);
      setIsLoading(false);
    });
  }, [article_id]);
  if (isLoading) return <p>Loading comments...</p>;
  return (
    <section>
      <h4>Comments</h4>
      {comments.map((comment) => {
        return <CommentCard key={comment.comment_id} comment={comment} />;
      })}
    </section>
  );
}
