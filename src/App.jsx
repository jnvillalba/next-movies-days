import { lazy, Suspense } from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router";
import "./App.css";
import Home from "./Components/Home/Home";

function moviePage(loadList, studio, year) {
  return lazy(async () => {
    const [{ default: MovieList }, list] = await Promise.all([
      import("./Components/MovieList"),
      loadList(),
    ]);
    return {
      default: function MoviePage() {
        return <MovieList studio={studio} año={year} list={list} />;
      },
    };
  });
}

const Movies2026 = moviePage(
  () => import("./Lists/2026list").then((m) => m.content2026List),
  "marvel",
  2026,
);
const Movies2027 = moviePage(
  () => import("./Lists/2027list").then((m) => m.content2027List),
  "marvel",
  2027,
);
const Movies2028 = moviePage(
  () => import("./Lists/2028list").then((m) => m.content2028List),
  "marvel",
  2028,
);
const MoviesTBA = moviePage(
  () => import("./Lists/tba").then((m) => m.tba),
  "marvel",
);
const MoviesMarvel = moviePage(
  () => import("./Lists/marvelList").then((m) => m.marvelAllList),
  "marvel",
  "All",
);
const MoviesDC = moviePage(
  () => import("./Lists/DC/DCUList").then((m) => m.DCUList),
  "dc",
  "Chapter 1: God and Monsters",
);
const MoviesSony = moviePage(
  () => import("./Lists/Sony/SonyList").then((m) => m.SonyList),
  "sony",
  "Sony",
);
const MoviesSW = moviePage(
  () => import("./Lists/SW/SWList").then((m) => m.SWList),
  "SW",
  "Star Wars",
);
const NotFound = lazy(() => import("./Components/NotFound"));

export function AppRoutes() {
  return (
    <Suspense
      fallback={
        <p className="text-center py-5" role="status">
          Cargando películas…
        </p>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/2026" element={<Movies2026 />} />
        <Route path="/2027" element={<Movies2027 />} />
        <Route path="/2028" element={<Movies2028 />} />
        <Route path="/tba" element={<MoviesTBA />} />
        <Route path="/orden" element={<MoviesMarvel />} />
        <Route path="/all" element={<Navigate to="/orden" replace />} />
        <Route path="/DC" element={<MoviesDC />} />
        <Route path="/Sony" element={<MoviesSony />} />
        <Route path="/SW" element={<MoviesSW />} />
        <Route path="/Home" element={<Navigate to="/" replace />} />
        <Route path="/next-movies-days" element={<Navigate to="/" replace />} />
        <Route
          path="/next-movies-days/build"
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/next-movies-days/Home"
          element={<Navigate to="/" replace />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
