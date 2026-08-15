import { useEffect, useRef, useState } from "react";

function Studio({ poster, onClick, video, index }) {
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
      role="button"
      tabIndex={0}
      data-studio-index={index}
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
        onClick={onClick}
      />
      <video
        ref={videoRef}
        loop
        autoPlay
        muted
        playsInline
        onClick={onClick}
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}

export default Studio;
