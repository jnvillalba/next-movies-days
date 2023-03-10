import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import "./App.css";
import MovieList from "./Components/MovieList";
import { content2023List } from "./Lists/2023list";
import { content2024List } from "../src/Lists/2024list";
import { content2025List } from "./Lists/2025list";
import { content2026List } from "./Lists/2026list";
import { tba } from "./Lists/tba";
import { DCUList } from "./Lists/DC/DCUList";
import { SonyList } from "./Lists/Sony/SonyList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route
            exact
            path="/2023"
            element={
              <MovieList studio={"marvel"} año={2023} list={content2023List} />
            }
          />
          <Route
            exact
            path="/2024"
            element={
              <MovieList studio={"marvel"} año={2024} list={content2024List} />
            }
          />
          <Route
            exact
            path="/2025"
            element={
              <MovieList studio={"marvel"} año={2025} list={content2025List} />
            }
          />
          <Route
            exact
            path="/2026"
            element={
              <MovieList studio={"marvel"} año={2026} list={content2026List} />
            }
          />
          <Route
            exact
            path="/tba"
            element={<MovieList studio={"marvel"} list={tba} />}
          />
          <Route
            exact
            path="/DC"
            element={
              <MovieList
                studio={"dc"}
                año={"DC Universe Chapter 1: God and Monsters"}
                list={DCUList}
              />
            }
          />
          <Route
            exact
            path="/Sony"
            element={<MovieList studio={"sony"} año={"Sony"} list={SonyList} />}
          />

          <Route exact path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
