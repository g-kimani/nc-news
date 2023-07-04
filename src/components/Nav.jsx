import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import List from "@mui/material/List";

import { useContext, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { getTopics } from "../utils/utils";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Nav() {
  const [topics, setTopics] = useState([]);
  const [topicsLoading, setTopicsLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user } = useContext(UserContext);

  const location = useLocation();

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);
  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  useEffect(() => {
    console.log(location);
  }, [location]);

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <div className="flex flex-shrink-0 items-center justify-center h-14 rounded mr-2 ">
        <Link to="/">
          <img
            src="./nc-news-logo.ico"
            className="w-auto h-14"
            alt="NC News Logo"
          />
        </Link>
      </div>
      <Divider />
      <List>
        <Link to="/">
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Home"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/articles">
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Articles"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Divider>Topics</Divider>
        {topics.map(({ slug }) => (
          <Link key={slug} to={`/topics/${slug}`}>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center", textTransform: "capitalize" }}
              >
                <ListItemText primary={slug} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          className="bg-charcoal"
          // sx={{ backgroundColor: "white", color: "#213547" }}
          elevation={0}
        >
          <Toolbar className="h-20 flex items-center justify-between">
            <IconButton
              aria-label="open-drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className=" sm:hidden text-white"
            >
              <MenuIcon />
            </IconButton>
            <div className="flex flex-1 items-center justify-center sm:justify-start gap-4">
              <div className="hidden sm:flex flex-shrink-0 items-center bg-gray-700 rounded mr-2 ">
                <Link to="/">
                  <img
                    src="./nc-news-logo.ico"
                    className="w-auto h-14"
                    alt="NC News Logo"
                  />
                </Link>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">NC News</h1>
              <div className="hidden sm:flex gap-2">
                <Link
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "bg-gray-900"
                      : "text-gray-300 hover:bg-yellow-theme hover:text-black"
                  } text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300`}
                >
                  Home
                </Link>
                <Link
                  to="/articles"
                  className={`${
                    location.pathname === "/articles"
                      ? "bg-gray-900"
                      : "text-gray-300 hover:bg-yellow-theme hover:text-black"
                  } text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300`}
                >
                  Articles
                </Link>
                {topicsLoading
                  ? [1, 2, 3].map((i) => {
                      return (
                        <div className="bg-gray-200 animate-pulse px-3 py-2 w-16 rounded-md transition-all duration-300"></div>
                      );
                    })
                  : topics.map((topic) => {
                      return (
                        <Link
                          key={topic.slug}
                          to={`/topics/${topic.slug}`}
                          className={`${
                            location.pathname === `/topics/${topic.slug}`
                              ? "bg-gray-900"
                              : "text-gray-300 hover:bg-yellow-theme hover:text-black"
                          } text-white rounded-md px-3 py-2 text-sm font-medium transition-all duration-300`}
                        >
                          {topic.slug[0].toUpperCase() +
                            topic.slug.substring(1)}
                        </Link>
                      );
                    })}
              </div>
            </div>
            <div className=""></div>
            <Avatar
              src={user.avatar_url}
              imgProps={{ width: "auto" }}
              sx={{ width: "50px", height: "50px" }}
              title={user.username}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: 240,
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>
    </>
  );
}
