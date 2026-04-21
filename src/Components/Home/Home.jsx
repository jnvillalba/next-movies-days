import { useNavigate } from "react-router-dom";
import dcVideo from "../../assets/dc.mp4";
import marvelVideo from "../../assets/marvel.mp4";
import sonyVideo from "../../assets/sony.mp4";
import sonyPoster from "../../assets/sonymarvel.jpg";
import Studio from "../Studio/Studio";

const Home = () => {
  const navigate = useNavigate();

  const studios = [
    {
      name: "Marvel",
      poster:
        "https://anthoncode.com/wp-content/uploads/2018/06/marvel-studios-logo-vector.jpg?is-pending-load=1",
      video: marvelVideo,
      navigateTo: () => navigate("/2026"),
    },
    {
      name: "DC",
      poster:
        "https://pbs.twimg.com/media/GTce7diWEAAZBvU?format=jpg&name=large",
      video: dcVideo,
      navigateTo: () => navigate("/DC"),
    },
    {
      name: "Sony",
      poster: sonyPoster,
      video: sonyVideo,
      navigateTo: () => navigate("/Sony"),
    },
    {
      name: "Star Wars",
      poster:
        "https://preview.redd.it/l3fya3oustw41.jpg?width=1080&crop=smart&auto=webp&s=9a20a14a32a55a24745bd76e467c5907c3ba4df4",
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
            {studios.map((studio) => (
              <Studio
                key={studio.name}
                poster={studio.poster}
                onSelect={studio.navigateTo}
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
