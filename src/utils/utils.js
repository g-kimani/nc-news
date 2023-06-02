import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles(
  page,
  limit,
  topic,
  order = "asc",
  sortBy = "created_at"
) {
  return ncNewsApi
    .get(
      `/articles?p=${page}&limit=${limit}&order=${order}&sort_by=${sortBy}${
        topic ? "&topic=" + topic : ""
      }`
    )
    .then((res) => res.data);
}

export function getArticle(article_id) {
  return ncNewsApi.get(`/articles/${article_id}`).then((res) => res.data);
}

export function getTopics() {
  return ncNewsApi.get("/topics").then((res) => res.data);
}

export function getArticleComments(article_id, page, limit) {
  return ncNewsApi
    .get(`/articles/${article_id}/comments?p=${page}&limit=${limit}`)
    .then((res) => res.data);
}

export function postArticleComment(article_id, postReq) {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, postReq)
    .then((res) => res.data);
}

export function updateArticle(article_id, patchReq) {
  return ncNewsApi
    .patch(`/articles/${article_id}`, patchReq)
    .then((res) => res.data);
}

export function getUserInfo(username) {
  return ncNewsApi.get(`/users/${username}`).then((res) => res.data);
}

export function updateComment(comment_id, patchReq) {
  return ncNewsApi
    .patch(`/comments/${comment_id}`, patchReq)
    .then((res) => res.data);
}
