import { updateArticle } from "../utils/utils";
import VotesController from "./VotesController";

export default function ArticleVotes({ article_id, votes, setVotes }) {
  const updateVotes = (votesObj) => {
    return updateArticle(article_id, votesObj);
  };
  return (
    <VotesController
      votes={votes}
      setVotes={setVotes}
      updateVotes={updateVotes}
    />
  );
}
