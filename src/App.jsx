import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";
import Nav from "./components/Nav";
import { Box, Divider } from "@mui/material";
import { UserContext } from "./contexts/UserContext";
import { useEffect, useState } from "react";
import TopicPage from "./components/TopicPage";
import AllArticles from "./components/AllArticles";
import NotFound from "./components/NotFound";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/topics/:topic" element={<TopicPage />}></Route>
          <Route path="/articles" element={<AllArticles />}></Route>
          <Route path="/articles/:article_id" element={<ArticlePage />}></Route>
          <Route path="/404" element={<NotFound />}></Route>
          <Route path="*" element={<Navigate to="/404" replace />}></Route>
        </Routes>
        <div className="flex flex-col items-center justify-center text-white mt-8">
          <div className="my-2">
            <p>Created & Designed By George Kimani</p>
          </div>
          <div>
            <Divider className="text-white before:border-yellow-theme my-4 after:border-yellow-theme">
              Contact Me
            </Divider>
            <div className="flex gap-4">
              <a
                href="https://github.com/g-kimani"
                target="_blank"
                rel="noreferrer"
              >
                <div className="rounded-full text-white hover:bg-yellow-theme hover:text-black transition-all duration-500 p-1 px-2  flex items-center justify-center">
                  <AccountCircleIcon className="mr-2" />
                  Portfolio
                </div>
              </a>
              <a
                href="https://github.com/g-kimani"
                target="_blank"
                rel="noreferrer"
              >
                <div className="rounded-full text-white hover:bg-yellow-theme hover:text-black transition-all duration-500 p-1 px-2  flex items-center justify-center">
                  <GitHubIcon className="mr-2" />
                  GitHub
                </div>
              </a>
              <a
                href="https://github.com/g-kimani"
                target="_blank"
                rel="noreferrer"
              >
                <div className="rounded-full text-white hover:bg-yellow-theme hover:text-black transition-all duration-500 p-1 px-2 flex items-center justify-center">
                  <LinkedInIcon className="mr-2" />
                  LinkedIn
                </div>
              </a>
            </div>
          </div>
        </div>
      </UserContext.Provider>
    </>
  );
}

export default App;
