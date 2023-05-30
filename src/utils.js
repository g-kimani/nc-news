import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://northcoders-news.onrender.com/api",
});

export function getArticles() {
  return ncNewsApi.get("/articles").then((res) => res.data);
}
