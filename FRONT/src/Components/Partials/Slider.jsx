import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function Slider({ artId, mediaFiles, mediaAlts }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getResponsiveSuffix = () => {
    if (window.innerWidth <= 768) {
      return `-short`;
    } else if (window.innerWidth <= 1024) {
      return `-middle`;
    } else {
      return `-large`;
    }
  };

  const suffix = getResponsiveSuffix();

  if (artId === null) return null;

  let images = [];

  if (artId > 0 && mediaFiles != undefined) {
    images = mediaFiles.map((name, index) => ({
      key: "${index}",
      id: index + 1,
      src: `/src/assets/img/article_${artId}/${name}${suffix}.webp`,
      alt: mediaAlts[index] || `Image ${index + 1}`,
    }));
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="slider-container">
      <div className="slider">
        {images.length > 1 && (
          <button className="slider-btn prev" onClick={handlePrev}>
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
        )}
        <div
          className="slider-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image) => (
            <img
              key={String(image.id)}
              src={image.src}
              alt={image.alt}
              className="slider-image"
            />
          ))}
        </div>
        {images.length > 1 && (
          <button className="slider-btn next" onClick={handleNext}>
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Slider;
