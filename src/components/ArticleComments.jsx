import { useEffect, useState } from "react";
import { getArticleComments } from "../utils";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";

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
  const addComment = (comment) => {
    setComments((comments) => [comment, ...comments]);
  };
  if (isLoading) return <p>Loading comments...</p>;
  return (
    <section>
      <h4>Comments</h4>
      <CommentForm article_id={article_id} addComment={addComment} />
      {comments.length === 0 ? (
        <p>Be the first to add a comment ...</p>
      ) : (
        comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })
      )}
    </section>
  );
}
