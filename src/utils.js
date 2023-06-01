import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles(page, limit, topic) {
  return ncNewsApi
    .get(`/articles?p=${page}&limit=${limit}${topic ? "&topic=" + topic : ""}`)
    .then((res) => res.data);
}

export function getArticle(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => res.data);
}

export function getTopics() {
  return ncNewsApi.get("/topics").then((res) => res.data);
}

export function getArticleComments(article_id) {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((res) => res.data);
}

export function updateArticle(article_id, patchReq) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, patchReq)
    .then((res) => res.data);
}
