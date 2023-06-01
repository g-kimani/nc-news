import { useEffect, useState } from "react";
import { deleteComment, getArticleComments } from "../utils";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Button, Collapse, Pagination } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShowMessage from "./ShowMessage";

export default function ArticleComments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState({});
  useEffect(() => {
    setIsLoading(true);
    getArticleComments(article_id, page, pageLimit).then((data) => {
      setComments(data.comments);
      setTotalPages(Math.ceil(data.total_count / pageLimit));
      setIsLoading(false);
    });
  }, [article_id, page]);
  const addComment = (comment) => {
    setComments((comments) => [comment, ...comments]);
  };
  const setArticleComment = (index, setComment) => {
    setComments((prevComments) => {
      const newComments = [...prevComments];
      newComments[index] = setComment(newComments[index]);
      return newComments;
    });
  };
  const deleteArticleComment = (index, comment_id) => {
    return deleteComment(comment_id).then(() => {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        newComments.splice(index, 1);
        return newComments;
      });
      setMessage({ open: true, severity: "success", text: "Comment Deleted" });
    });
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const handleCloseMessage = () => {
    setMessage((prev) => {
      return { ...prev, open: false };
    });
  };
  if (isLoading) return <p>Loading comments...</p>;
  return (
    <section>
      <h4>Comments</h4>
      <div className="comment-controls">
        <Button onClick={() => setShowCommentForm((a) => !a)}>
          <ModeCommentOutlinedIcon
            sx={{ margin: "0 5px" }}
          ></ModeCommentOutlinedIcon>{" "}
          {showCommentForm ? "Hide" : "Post Comment"}
        </Button>
        <Collapse in={showCommentForm}>
          <CommentForm article_id={article_id} addComment={addComment} />
        </Collapse>
      </div>
      {comments.length === 0 ? (
        <p>Be the first to add a comment ...</p>
      ) : (
        comments.map((comment, index) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComment={(callback) => setArticleComment(index, callback)}
              deleteComment={() =>
                deleteArticleComment(index, comment.comment_id)
              }
            />
          );
        })
      )}
      {comments.length > 0 ? (
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
          color="primary"
          variant="outlined"
        />
      ) : (
        ""
      )}
      <ShowMessage message={message} close={handleCloseMessage} />
    </section>
  );
}
