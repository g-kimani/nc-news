import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticlesByTopic } from "../utils";
import ArticleGrid from "./ArticleGrid";

export default function TopicPage() {
  const { topic } = useParams();

  return (
    <>
      <ArticleGrid topic={topic} />
    </>
  );
}
