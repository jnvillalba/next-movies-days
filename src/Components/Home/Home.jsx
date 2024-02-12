import React from "react";
import Studio from "../Studio/Studio";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const goToMarvelIndex = () => navigate("/2024");
  const goToDCIndex = () => navigate("/DC");
  const goToSonyIndex = () => navigate("/Sony");
  const goToSWIndex = () => navigate("/SW");

  const marvel =
    "https://anthoncode.com/wp-content/uploads/2018/06/marvel-studios-logo-vector.jpg?is-pending-load=1";

  const dc =
    "https://i0.wp.com/www.comicsuniverse.it/wp-content/uploads/2022/12/FkGzHi_XEAA60bL.jpeg?ssl=1";

  const sony =
    "https://pbs.twimg.com/media/FXufOEcVUAAt_Ts?format=jpg&name=large";

  const sw =
    "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A92131654C1E0B1A4C072A327E49FB30CA8BDED279852FB32CAD9B33B4AAAB1/scale?width=1440&aspectRatio=1.78&format=jpeg";

  const vMarvel = require("../../assets/marvel.mp4");
  const vDC = require("../../assets/dc.mp4");
  const vSony = require("../../assets/sony.mp4");

  return (
    <>
      <div className="container container d-flex justify-content-center container_cards mt-5">
        <h1 className="año">Studios</h1>
        <div className="container_projects">
          <figure className="icon-cards mt-3">
            <div className="icon-cards__content">
              <Studio poster={marvel} index={goToMarvelIndex} video={vMarvel} />
              <Studio poster={dc} index={goToDCIndex} video={vDC} />
              <Studio poster={sony} index={goToSonyIndex} video={vSony} />
              <Studio poster={sw} index={goToSWIndex} />
            </div>
          </figure>
        </div>
      </div>
    </>
  );
};

export default Home;
