import { useEffect, useState } from "react";
import { getArticleComments } from "../utils";
import CommentCard from "./CommentCard";
import CommentForm from "./CommentForm";
import { Button, Collapse, Pagination } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { TransitionGroup } from "react-transition-group";

export default function ArticleComments({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
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
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  if (isLoading) return <p>Loading comments...</p>;
  return (
    <section>
      <h4 id="comments">Comments</h4>
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
        <TransitionGroup>
          {comments.map((comment, index) => {
            return (
              <Collapse key={comment.comment_id}>
                <CommentCard
                  comment={comment}
                  setComment={(callback) => setArticleComment(index, callback)}
                />
              </Collapse>
            );
          })}
        </TransitionGroup>
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
    </section>
  );
}
