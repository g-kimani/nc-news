import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles, setArticles }) {
  const handleSetArticle = (index, setArticle) => {
    setArticles((articles) => {
      const newArticles = [...articles];
      newArticles[index] = setArticle(newArticles[index]);
      return newArticles;
    });
  };
  return (
    <section className="article-grid">
      {articles.map((article, index) => {
        return (
          <ArticleCard
            key={article.article_id}
            article={article}
            setArticle={(callback) => {
              handleSetArticle(index, callback);
            }}
          />
        );
      })}
    </section>
  );
}
