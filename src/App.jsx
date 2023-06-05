import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import Nav from "./components/Nav";
import { Box } from "@mui/material";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import TopicPage from "./components/TopicPage";
import AllArticles from "./components/AllArticles";
import NotFound from "./components/NotFound";

function App() {
  const [user, setUser] = useState({
    username: "grumpy19",
    name: "Paul Grump",
    avatar_url:
      "https://vignette.wikia.nocookie.net/mrmen/images/7/78/Mr-Grumpy-3A.PNG/revision/latest?cb=20170707233013",
  });
  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Nav />
        <Box mt={"160px"}>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="/topics/:topic" element={<TopicPage />}></Route>
            <Route path="/articles" element={<AllArticles />}></Route>
            <Route
              path="/articles/:article_id"
              element={<ArticlePage />}
            ></Route>
            <Route path="/404" element={<NotFound />}></Route>
            <Route path="*" element={<Navigate to="/404" replace />}></Route>
          </Routes>
        </Box>
      </UserContext.Provider>
    </>
  );
}

export default App;
