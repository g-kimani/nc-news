import {
  AppBar,
  Divider,
  IconButton,
  Slide,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Stack } from "@mui/system";
import { getTopics } from "../utils";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    getTopics().then(({ topics }) => {
      setTopics(topics);
      setTopicsLoading(false);
    });
  }, []);
  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <HideOnScroll>
      <AppBar
        component="nav"
        sx={{ backgroundColor: { sm: "white" }, color: "#213547" }}
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
          >
            <span>
              <h1>NC News</h1>
            </span>
            <Stack spacing={2} direction="row" sx={{ marginBottom: "1em" }}>
              <Link to="/">Home</Link>
              {topicsLoading ? (
                <span>Topics loading ...</span>
              ) : (
                topics.map((topic) => {
                  return (
                    <Link key={topic.slug} to={`/topics/${topic.slug}`}>
                      {topic.slug}
                    </Link>
                  );
                })
              )}
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
