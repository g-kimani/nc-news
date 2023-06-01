import { updateComment } from "../utils";
import VotesController from "./VotesController";

export default function CommentVotes({ comment_id, votes, setVotes }) {
  const updateVotes = (votesObj) => {
    return updateComment(comment_id, votesObj);
  };
  return (
    <VotesController
      votes={votes}
      setVotes={setVotes}
      updateVotes={updateVotes}
    />
  );
}
