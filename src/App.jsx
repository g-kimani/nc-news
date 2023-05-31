import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import { Box } from "@mui/material";

function App() {
  return (
    <>
      <Nav />
      <Box mt={"160px"}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Box>
    </>
  );
}

export default App;
