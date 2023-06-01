import {
  AppBar,
  Avatar,
  Box,
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
import { getTopics } from "../utils";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);
  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawerContent = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        NC News
      </Typography>
      <Divider />
      <List>
        <Link to="/">
          <ListItem>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={"Home"} />
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
          sx={{ backgroundColor: "white", color: "#213547" }}
          elevation={0}
        >
          <Toolbar>
            <IconButton
              aria-label="open-drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              className="heading"
              spacing={2}
              divider={<Divider variant="middle" />}
              mb={"1em"}
            >
              <span>
                <h1>NC News</h1>
              </span>
              <Stack
                spacing={2}
                direction="row"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <Link to="/">Home</Link>
                {topicsLoading ? (
                  <span>Topics loading ...</span>
                ) : (
                  topics.map((topic) => {
                    return (
                      <Link key={topic.slug} to={`/topics/${topic.slug}`}>
                        {/* css text transform is bugging */}
                        {topic.slug[0].toUpperCase() + topic.slug.substring(1)}
                      </Link>
                    );
                  })
                )}
              </Stack>
            </Stack>
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
