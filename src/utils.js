import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles(page, limit) {
  return ncNewsApi
    .get(`/articles?p=${page}&limit=${limit}`)
    .then((res) => res.data);
}
