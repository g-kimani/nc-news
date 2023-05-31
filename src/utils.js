import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles(page, limit) {
  return ncNewsApi
    .get(`/articles?p=${page}&limit=${limit}`)
    .then((res) => res.data);
}

export function getArticle(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => res.data);
}

export function getTopics() {
  return ncNewsApi.get("/topics").then((res) => res.data);
}
