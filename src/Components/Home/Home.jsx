import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dcVideo from "../../assets/dc.mp4";
import marvelVideo from "../../assets/marvel.mp4";
import sonyVideo from "../../assets/sony.mp4";
import sonyPoster from "../../assets/sonymarvel.jpg";
import Studio from "../Studio/Studio";

const Home = () => {
  const navigate = useNavigate();
  const [autoRotation, setAutoRotation] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [suppressClick, setSuppressClick] = useState(false);
  const dragOffsetRef = useRef(0);
  const ROTATION_SPEED_DEG_PER_SEC = -360 / 14;
  const DRAG_THRESHOLD_PX = 8;
  const dragRef = useRef({
    active: false,
    pointerId: null,
    lastX: 0,
    startX: 0,
    moved: false,
  });

  useEffect(() => {
    dragOffsetRef.current = dragOffset;
  }, [dragOffset]);

  useEffect(() => {
    let frameId = null;
    let lastFrameTime = null;

    const tick = (timestamp) => {
      if (lastFrameTime !== null && !isDragging) {
        const deltaSeconds = (timestamp - lastFrameTime) / 1000;
        setAutoRotation(
          (prevRotation) =>
            prevRotation + ROTATION_SPEED_DEG_PER_SEC * deltaSeconds,
        );
      }

      lastFrameTime = timestamp;
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [isDragging]);

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

  const onPointerDown = (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragRef.current = {
      active: true,
      pointerId: event.pointerId,
      lastX: event.clientX,
      startX: event.clientX,
      moved: false,
    };

    setIsDragging(true);
    setSuppressClick(false);
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
    setDragOffset((prevRotation) => prevRotation + deltaX * 0.45);
  };

  const onPointerEnd = (event) => {
    if (
      !dragRef.current.active ||
      event.pointerId !== dragRef.current.pointerId
    ) {
      return;
    }

    const wasMoved = dragRef.current.moved;
    dragRef.current.active = false;
    dragRef.current.pointerId = null;

    setIsDragging(false);
    setAutoRotation((prevRotation) => prevRotation + dragOffsetRef.current);
    setDragOffset(0);

    if (wasMoved) {
      setSuppressClick(true);
      window.setTimeout(() => {
        setSuppressClick(false);
      }, 150);
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const totalRotation = autoRotation + dragOffset;

  return (
    <div className="container container d-flex justify-content-center container_cards mt-5">
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
            className={`icon-cards__drag ${isDragging ? "is-interacting" : ""}`}
            style={{
              transform: `translateZ(-35vw) rotateY(${totalRotation}deg)`,
            }}
          >
            <div className="icon-cards__content">
              {studios.map((studio) => (
                <Studio
                  key={studio.name}
                  poster={studio.poster}
                  onSelect={studio.navigateTo}
                  video={studio.video}
                  suppressClick={suppressClick || isDragging}
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
