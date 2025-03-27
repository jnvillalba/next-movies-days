import React, { useEffect, useRef, useState } from "react";

function Studio({ poster, index, video }) {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reiniciar el video cuando el componente se monte nuevamente
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className={`icon-cards__item d-flex align-items-center justify-content-center ${
        isHovered ? "hovered" : ""
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        className="studio"
        src={poster}
        alt="Logo"
        onClick={index}
        style={{ opacity: isHovered ? 0 : 1, transition: "opacity 0.9s ease" }}
      />
      <video
        ref={videoRef}
        loop
        autoPlay
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.9s ease",
        }}
        onClick={index}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Studio;
