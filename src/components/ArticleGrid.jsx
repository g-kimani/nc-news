export default function ArticleGrid({ articles }) {
  return (
    <section>
      {articles.map((article) => {
        return <p key={article.article_id}>{article.title}</p>;
      })}
    </section>
  );
}
