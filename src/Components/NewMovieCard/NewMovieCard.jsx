import AOS from "aos";
import React, { useEffect, useMemo } from "react";
import "./NewMovieCard.css";

const MovieCard = React.memo(
  ({ titulo, tipo, poster, estreno, poster2, director }) => {
    // Memoized AOS initialization to prevent unnecessary re-renders
    useEffect(() => {
      if (!window.AOSInitialized) {
        AOS.init({
          duration: 400,
          once: true, // Animation only happens once
        });
        window.AOSInitialized = true;
      }
    }, []);

    // Optimized date calculation with more robust error handling
    const daysRemaining = useMemo(() => {
      const specialCases = [
        "TBA",
        "TBA - 2025",
        "Primavera - EEUU",
        "Verano - EEUU",
        "Invierno - EEUU",
        "Otoño - EEUU",
      ];

      // Handle special cases first
      if (specialCases.includes(estreno)) {
        return estreno.split(" - ")[0];
      }

      // Robust date parsing
      const dateParts = estreno.split("/").map(Number);
      if (dateParts.length !== 3 || dateParts.some(isNaN)) {
        return "N/A";
      }

      const [dia, mes, año] = dateParts;
      const releaseDate = new Date(año, mes - 1, dia);
      const today = new Date();

      // Ensure valid date before calculation
      if (isNaN(releaseDate.getTime())) {
        return "N/A";
      }

      const timeDiff = releaseDate.getTime() - today.getTime();
      return timeDiff > 0 ? Math.round(timeDiff / (1000 * 60 * 60 * 24)) : 0;
    }, [estreno]);

    // Early return if no poster to prevent unnecessary rendering
    if (!poster) return null;

    // Determine type display
    const displayType = tipo === "PelaSW" ? "Pelicula" : tipo;

    return (
      <div className="card" data-aos="fade-up">
        <div className="date" id={tipo}>
          {daysRemaining} {typeof daysRemaining === "number" ? "Días" : ""}
        </div>

        <div className="image">
          <img
            src={poster ?? poster2}
            alt={`${titulo} poster`}
            loading="lazy" // Improve performance with lazy loading
          />
        </div>

        <div className="details">
          <div className="back">
            <img
              src={poster2 || poster}
              alt={`${titulo} back poster`}
              loading="lazy"
            />
            <div className="center">
              <h1>{titulo}</h1>
              {director}
              <p>Estreno: {estreno}</p>
              <p id={tipo}>{displayType}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
MovieCard.displayName = "MovieCard";

export default MovieCard;
