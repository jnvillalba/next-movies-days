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
        "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/11302a8a-d75f-41b1-bb32-bdca784f0ce9/dcjuggi-2f9b5f4c-f27c-421e-b297-c0ef19fea2e7.png/v1/fit/w_640,h_290,q_70,strp/sony_s_universe_of_marvel_characters_logo_concept_by_paulrom_dcjuggi-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MjkwIiwicGF0aCI6IlwvZlwvMTEzMDJhOGEtZDc1Zi00MWIxLWJiMzItYmRjYTc4NGYwY2U5XC9kY2p1Z2dpLTJmOWI1ZjRjLWYyN2MtNDIxZS1iMjk3LWMwZWYxOWZlYTJlNy5wbmciLCJ3aWR0aCI6Ijw9NjQwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.6JhMYWb-nqb6tRdnsVgg6pvtDIWInQDQVTLTlVU9PWM",
      video: require("../../assets/sony.mp4"),
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
