import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles }) {
  return (
    <section className="article-grid">
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </section>
  );
}
