import React, { useMemo } from "react";
import "../App.css";
import NavBar from "../Components/NavBar/NavBar";
import MovieCard from "../Components/NewMovieCard/NewMovieCard";

const MovieList = React.memo(({ año, list, studio }) => {
  // Memoize the rendered movie cards to prevent unnecessary re-renders
  const memoizedMovieCards = useMemo(
    () =>
      list.map((c) => (
        <MovieCard
          key={c.id}
          poster={c.poster}
          poster2={c.poster2}
          titulo={c.titulo}
          estreno={c.estreno}
          tipo={c.tipo}
          director={c.director}
        />
      )),
    [list]
  );

  // Memoize the display year to prevent unnecessary recalculations
  const displayYear = useMemo(() => año || "TBA", [año]);

  return (
    <>
      <NavBar studio={studio} />
      <div className="container mt-2" id={`${studio}Background`}>
        <div className="container_cards">
          <h1 className="año">{displayYear}</h1>
          <div className="container_projects">{memoizedMovieCards}</div>
        </div>
      </div>
    </>
  );
});

export default MovieList;
