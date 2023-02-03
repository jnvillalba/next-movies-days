import React from "react";
import "../App.css";
import MovieCard from "../Components/NewMovieCard/NewMovieCard";

import NavBar from "../Components/NavBar/NavBar";

const MovieList = ({ año, list, studio }) => {
  return (
    <>
      <body id={studio + "Background"}>
        {studio === "marvel" && <NavBar></NavBar>}
        <div className="container">
          <div className="container_cards">
            <h1 className="año">{año ? año : "TBA"}</h1>
            <div className="container_projects">
              {list.map((c) => (
                <MovieCard
                  key={c.id}
                  poster={c.poster}
                  poster2={c.poster2}
                  titulo={c.titulo}
                  estreno={c.estreno}
                  tipo={c.tipo}
                />
              ))}
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default MovieList;
