import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import dcVideo from "../../assets/dc.mp4";
import marvelVideo from "../../assets/marvel.mp4";
import marvelPoster from "../../assets/marvelposter.jpg";
import sonyVideo from "../../assets/sony.mp4";
import sonyPoster from "../../assets/sonymarvel.png";
import Studio from "../Studio/Studio";

const Home = () => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  const rotationRef = useRef(0);
  const carouselRef = useRef(null);
  const ROTATION_SPEED_DEG_PER_SEC = -360 / 14;
  const DRAG_THRESHOLD_PX = 8;
  const dragRef = useRef({
    active: false,
    pointerId: null,
    lastX: 0,
    startX: 0,
    moved: false,
    studioIndex: null,
  });

  const paintRotation = () => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateZ(calc(-1 * var(--carousel-radius))) rotateY(${rotationRef.current}deg)`;
    }
  };

  useEffect(() => {
    let frameId = null;
    let lastFrameTime = null;
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const tick = (timestamp) => {
      if (
        lastFrameTime !== null &&
        !dragRef.current.active &&
        !document.hidden
      ) {
        const deltaSeconds = Math.min((timestamp - lastFrameTime) / 1000, 0.1);
        rotationRef.current =
          (rotationRef.current + ROTATION_SPEED_DEG_PER_SEC * deltaSeconds) %
          360;
        paintRotation();
      }

      lastFrameTime = timestamp;
      frameId = window.requestAnimationFrame(tick);
    };

    const updateMotion = () => {
      if (frameId !== null) window.cancelAnimationFrame(frameId);
      frameId = null;
      lastFrameTime = null;
      if (!motionPreference.matches) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    updateMotion();
    motionPreference.addEventListener("change", updateMotion);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      motionPreference.removeEventListener("change", updateMotion);
    };
  }, []);

  const studios = [
    {
      name: "Marvel",
      poster: marvelPoster,
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

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const studioItem = event.target.closest(".icon-cards__item");
    const studioIndex = studioItem?.dataset?.studioIndex;

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      startX: event.clientX,
      moved: false,
      studioIndex: studioIndex !== undefined ? Number(studioIndex) : null,
    };

    setIsDragging(true);

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (
      !dragRef.current.active ||
      event.pointerId !== dragRef.current.pointerId
    ) {
      return;
    }

    const deltaX = event.clientX - dragRef.current.lastX;
    const totalDeltaX = Math.abs(event.clientX - dragRef.current.startX);

    if (totalDeltaX >= DRAG_THRESHOLD_PX) {
      dragRef.current.moved = true;
    }

    dragRef.current.lastX = event.clientX;
    rotationRef.current = (rotationRef.current + deltaX * 0.45) % 360;
    paintRotation();
  };

  const onPointerEnd = (event) => {
    if (
      !dragRef.current.active ||
      event.pointerId !== dragRef.current.pointerId
    ) {
      return;
    }

    const wasMoved = dragRef.current.moved;
    const selectedStudioIndex = dragRef.current.studioIndex;
    dragRef.current.active = false;
    dragRef.current.pointerId = null;
    dragRef.current.studioIndex = null;

    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (
      event.type !== "pointercancel" &&
      !wasMoved &&
      Number.isInteger(selectedStudioIndex)
    ) {
      studios[selectedStudioIndex]?.navigateTo();
    }
  };

  return (
    <div className="container container_cards mt-5">
      <h1 className="year">Studios</h1>
      <div className="container_projects">
        <figure
          className={`icon-cards mt-3 ${isDragging ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerEnd}
          onPointerCancel={onPointerEnd}
        >
          <div
            ref={carouselRef}
            className={`icon-cards__drag ${isDragging ? "is-interacting" : ""}`}
          >
            <div className="icon-cards__content">
              {studios.map((studio, index) => (
                <Studio
                  key={studio.name}
                  index={index}
                  poster={studio.poster}
                  onClick={studio.navigateTo}
                  video={studio.video}
                />
              ))}
            </div>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default Home;
