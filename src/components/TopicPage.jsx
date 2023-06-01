import { useParams } from "react-router-dom";
import ArticleGrid from "./ArticleGrid";

export default function TopicPage() {
  const { topic } = useParams();

  return (
    <>
      <ArticleGrid topic={topic} />
    </>
  );
}
