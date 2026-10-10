import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import Intro from "./components/Intro.jsx";
import Home from "./Home.jsx";
import Stories from "./Stories.jsx";
import Library from "./Library.jsx";
import Motivation from "./Motivation.jsx";
import PageNotFound from "./PageNotFound.jsx";
import YourCandy from "./YourCandy.jsx";
import Chapter from "./Chapter.jsx";
import About from "./components/About.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import GenerateStory from "./GenerateStory.jsx";

import data from "./storiesData.json";

import {
  Route,
  BrowserRouter,
  Routes
} from "react-router-dom";

function App() {
  const [sdata, setSdata] = useState(getInitialData);

  function getInitialData() {
    const temp = localStorage.getItem("sdata");

    if (temp) {
      return JSON.parse(temp);
    }

    return data.map((entry) => ({
      ...entry,
      isAdded: 0,
      chNo: 1
    }));
  }

  useEffect(() => {
    localStorage.setItem(
      "sdata",
      JSON.stringify(sdata)
    );
  }, [sdata]);

  const [bg, setBg] = useState("light");

  const handleClick = () => {
    setBg(
      bg === "light"
        ? "dark"
        : "light"
    );
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--root-bg-color",
      bg === "dark"
        ? "#030637"
        : "#ffffff"
    );

    document.documentElement.style.setProperty(
      "--root-font-color",
      bg === "dark"
        ? "#ffffff"
        : "#000000"
    );
  }, [bg]);

  return (
    <BrowserRouter>
      <Navbar
        theme={
          bg === "dark"
            ? "dark"
            : "light"
        }
        bg={bg}
        handleClick={handleClick}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home>
              <Intro bg={bg} />
            </Home>
          }
        />

        <Route
          path="/stories"
          element={
            <Stories
              sdata={sdata}
              setSdata={setSdata}
            />
          }
        />

        <Route
          path="/library"
          element={
            <Library
              sdata={sdata}
              setSdata={setSdata}
            />
          }
        />

        <Route
          path="/story/:id/:ch"
          element={
            <Chapter
              sdata={sdata}
              setSdata={setSdata}
            />
          }
        />

        <Route
          path="/generate"
          element={<GenerateStory />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/motivationCandy"
          element={<Motivation />}
        />

        <Route
          path="/yourCandy"
          element={<YourCandy />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
