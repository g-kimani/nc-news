import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import Nav from "./components/Nav";
import { Box } from "@mui/material";
import TopicPage from "./components/TopicPage";

function App() {
  return (
    <>
      <Nav />
      <Box mt={"160px"}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/topics/:topic" element={<TopicPage />}></Route>
          <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
