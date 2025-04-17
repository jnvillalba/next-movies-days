import React from "react";
import { useNavigate } from "react-router-dom";
import Studio from "../Studio/Studio";

const Home = () => {
  const navigate = useNavigate();

  const studios = [
    {
      name: "Marvel",
      poster:
        "https://anthoncode.com/wp-content/uploads/2018/06/marvel-studios-logo-vector.jpg?is-pending-load=1",
      video: require("../../assets/marvel.mp4"),
      navigateTo: () => navigate("/2025"),
    },
    {
      name: "DC",
      poster:
        "https://pbs.twimg.com/media/GTce7diWEAAZBvU?format=jpg&name=large",
      video: require("../../assets/dc.mp4"),
      navigateTo: () => navigate("/DC"),
    },
    {
      name: "Sony",
      poster:
        "https://pbs.twimg.com/media/FXufOEcVUAAt_Ts?format=jpg&name=large",
      video: require("../../assets/sony.mp4"),
      navigateTo: () => navigate("/Sony"),
    },
    {
      name: "Star Wars",
      poster:
        "https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/5A92131654C1E0B1A4C072A327E49FB30CA8BDED279852FB32CAD9B33B4AAAB1/scale?width=1440&aspectRatio=1.78&format=jpeg",
      video: null,
      navigateTo: () => navigate("/SW"),
    },
  ];

  return (
    <div className="container container d-flex justify-content-center container_cards mt-5">
      <h1 className="year">Studios</h1>
      <div className="container_projects">
        <figure className="icon-cards mt-3">
          <div className="icon-cards__content">
            {studios.map((studio, index) => (
              <Studio
                key={index}
                poster={studio.poster}
                index={studio.navigateTo}
                video={studio.video}
              />
            ))}
          </div>
        </figure>
      </div>
    </div>
  );
};

export default Home;
