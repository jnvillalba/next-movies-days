import React, { useEffect } from "react";
import "./NewMovieCard.css";
import AOS from "aos";

const MovieCard = ({ titulo, tipo, poster, estreno, poster2, director }) => {
  const fechaDia = estreno[0] + estreno[1];
  const fechaMes = estreno[3] + estreno[4];
  const fechaAño = estreno[6] + estreno[7] + estreno[8] + estreno[9];
  const fecha2 = new Date();

  let fecha1 = new Date(fechaAño + "/" + fechaMes + "/" + fechaDia);

  let resta = fecha1.getTime() - fecha2.getTime();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      {poster !== "" && (
        <div className="card" data-aos="fade-up">
          {(() => {
            switch (estreno) {
              case "TBA":
                return (
                  <div className="date" id={tipo}>
                    TBA
                  </div>
                );
              case "TBA - 2024":
                return (
                  <div className="date" id={tipo}>
                    2024
                  </div>
                );
              case "Primavera - EEUU":
                return (
                  <div className="date" id={tipo}>
                    Primavera
                  </div>
                );
              case "Verano - EEUU":
                return (
                  <div className="date" id={tipo}>
                    Verano
                  </div>
                );
              case "Invierno - EEUU":
                return (
                  <div className="date" id={tipo}>
                    Invierno
                  </div>
                );
              case "Otoño - EEUU":
                return (
                  <div className="date" id={tipo}>
                    Otoño
                  </div>
                );
              default:
                return (
                  <div className="date" id={tipo}>
                    {Math.round(resta / (1000 * 60 * 60 * 24))} Días
                  </div>
                );
            }
          })()}
          <div className="image">
            <img src={poster} alt="poster" />
          </div>
          <div className="details">
            <div className="back">
              <img src={poster2 ? poster2 : poster} alt={titulo + " poster"} />

              <div className="center">
                <h1>
                  {titulo}
                  <br />
                </h1>
                {director}
                <p>Estreno: {estreno}</p>
                <p id={tipo}>{tipo === "PelaSW" ? "Pelicula" : tipo}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MovieCard;
