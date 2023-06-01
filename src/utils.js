import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles(page, limit, topic, order, sortBy) {
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

export function formatDate(date) {
  const today = new Date();
  const diffTime = Math.abs(today - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    if (diffHours === 0) {
      if (diffMinutes === 0) {
        return "~1 minute ago";
      } else if (diffMinutes === 1) {
        return "1 minute ago";
      } else {
        return `${diffMinutes} minutes ago`;
      }
    } else if (diffHours === 1) {
      return "1 hour ago";
    } else {
      return `${diffHours} hours ago`;
    }
  } else if (diffDays <= 7) {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  } else {
    return date.toLocaleDateString();
  }
}

export function updateComment(comment_id, patchReq) {
  return ncNewsApi
    .patch(`/comments/${comment_id}`, patchReq)
    .then((res) => res.data);
}
