import React, { useMemo, useState } from "react";
import "./NewMovieCard.css";

const MovieCard = React.memo(
  ({ titulo, tipo, poster, estreno, poster2, director, plataforma }) => {
    const [frontSrc, setFrontSrc] = useState(poster || poster2);
    const [backSrc, setBackSrc] = useState(poster2 || poster);

    const daysRemaining = useMemo(() => {
      if (estreno.toLowerCase().includes("tba")) return "TBA";

      const specialCases = [
        "Primavera - EEUU",
        "Verano - EEUU",
        "Invierno - EEUU",
        "Otoño - EEUU",
      ];

      if (specialCases.includes(estreno)) return estreno.split(" - ")[0];

      const dateParts = estreno.split("/").map(Number);
      if (dateParts.length !== 3 || dateParts.some(isNaN)) return estreno;

      const [dia, mes, año] = dateParts;
      const releaseDate = new Date(año, mes - 1, dia);
      const today = new Date();

      if (isNaN(releaseDate.getTime())) return estreno;

      const timeDiff = releaseDate.getTime() - today.getTime();
      return timeDiff > 0 ? Math.round(timeDiff / (1000 * 60 * 60 * 24)) : 0;
    }, [estreno]);

    const displayType = tipo === "PelaSW" ? "Pelicula" : tipo;

    return (
      <div className="card" data-aos="fade-up">
        <div className="date" id={tipo}>
          {daysRemaining} {typeof daysRemaining === "number" ? "Días" : ""}
        </div>

        <div className="image">
          <img
            src={frontSrc}
            alt={frontSrc ? `${titulo} poster` : titulo}
            loading="lazy"
            onError={() =>
              setFrontSrc(poster2 && poster2 !== frontSrc ? poster2 : null)
            }
          />
        </div>

        <div className="details">
          <div className="back">
            <img
              src={backSrc}
              alt={backSrc ? `${titulo} back poster` : titulo}
              loading="lazy"
              onError={() =>
                setBackSrc(poster && poster !== backSrc ? poster : null)
              }
            />
            <div className="center">
              <h1>{titulo}</h1>
              {director}
              {plataforma}
              <p>Estreno: {estreno}</p>
              <p className="opacity-100" id={tipo}>
                {displayType}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

export default MovieCard;
