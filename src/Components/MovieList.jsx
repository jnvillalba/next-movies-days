import React, { useMemo, useState } from "react";
import "../App.css";
import NavBar from "../Components/NavBar/NavBar";
import MovieCard from "../Components/NewMovieCard/NewMovieCard";

const MovieList = React.memo(({ año, list, studio }) => {
  // Add sorting state
  const [sortOrder, setSortOrder] = useState(null); // null, 'asc', or 'desc'

  // Function to parse and compare dates from the estreno field
  const compareDates = (dateA, dateB) => {
    // Helper function to extract date information
    const extractDateInfo = (dateStr) => {
      // Handle specific dates (DD/MM/YYYY)
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day).getTime();
      }

      // Handle "TBA - YYYY" format
      if (/TBA - \d{4}/.test(dateStr)) {
        const year = parseInt(dateStr.match(/\d{4}/)[0]);
        return new Date(year, 0, 1).getTime();
      }

      // Handle just "TBA" (should be sorted last)
      return Number.MAX_SAFE_INTEGER;
    };

    return extractDateInfo(dateA) - extractDateInfo(dateB);
  };

  // Memoize the sorted list
  const sortedList = useMemo(() => {
    if (!sortOrder) return list;

    return [...list].sort((a, b) => {
      const result = compareDates(a.estreno, b.estreno);
      return sortOrder === "asc" ? result : -result;
    });
  }, [list, sortOrder]);

  // Toggle sort order function
  const toggleSort = () => {
    setSortOrder((current) => {
      if (current === null) return "asc";
      if (current === "asc") return "desc";
      return null;
    });
  };

  // Memoize the rendered movie cards to prevent unnecessary re-renders
  const memoizedMovieCards = useMemo(
    () =>
      sortedList.map((c) => (
        <MovieCard
          key={c.id}
          poster={c.poster}
          poster2={c.poster2}
          titulo={c.titulo}
          estreno={c.estreno}
          tipo={c.tipo}
          director={c.director}
          plataforma={c.plataforma}
        />
      )),
    [sortedList]
  );

  // Memoize the display year to prevent unnecessary recalculations
  const displayYear = useMemo(() => año || "TBA", [año]);

  return (
    <>
      <NavBar studio={studio} />
      <div className="container my-2" id={`${studio}Background`}>
        <div className="container_cards">
          <div className="d-flex justify-content-between align-items-center mt-1">
            <h1 className="year">{displayYear}</h1>
            <button
              className="btn btn-sm"
              onClick={toggleSort}
              style={{
                backgroundColor: sortOrder ? "black" : "transparent",
                position: "absolute",
                right: "0",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                {sortOrder === null && (
                  <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
                )}
                {sortOrder === "asc" && (
                  <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                )}
                {sortOrder === "desc" && (
                  <path d="M3.5 3.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 12.293V3.5zm4 .5a.5.5 0 0 1 0-1h1a.5.5 0 0 1 0 1h-1zm0 3a.5.5 0 0 1 0-1h3a.5.5 0 0 1 0 1h-3zm0 3a.5.5 0 0 1 0-1h5a.5.5 0 0 1 0 1h-5zM7 12.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5z" />
                )}
              </svg>
            </button>
          </div>
          <div className="container_projects">{memoizedMovieCards}</div>
        </div>
      </div>
    </>
  );
});

export default MovieList;
