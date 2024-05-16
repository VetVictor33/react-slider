import { useEffect, useRef, useState } from "react";
import { images } from "../../data/images";

import styles from "./slider.module.css";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideShow = useRef(null);

  const startSlideShow = () => {
    if (slideShow.current) clearInterval(slideShow.current);
    slideShow.current = setInterval(() => {
      handleNext();
    }, 2500);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    startSlideShow();
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
    startSlideShow();
  };

  useEffect(() => {
    startSlideShow();
    return () => {
      clearInterval(slideShow.current);
    };
  }, []);

  return (
    <div className={styles["slider-container"]}>
      <button className={styles["slider-button"]} onClick={handlePrev}>
        {"<"}
      </button>
      <div className={styles["slider-outer"]}>
        {images.map((image, index) => (
          <div
            className={styles["slider-img-container"]}
            key={index}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`,
            }}
          >
            <img
              className={styles["slider-img"]}
              src={image.url}
              alt={image.alt}
            />
          </div>
        ))}
      </div>
      <div className={styles["slider-dot-container"]}>
        {images.map((image, index) => (
          <span
            className={styles["slider-dot"]}
            key={index}
            style={{
              ...(index === currentIndex && { backgroundColor: "blue" }),
            }}
          ></span>
        ))}
      </div>
      <button className={styles["slider-button"]} onClick={handleNext}>
        {">"}
      </button>
    </div>
  );
};

export default Slider;
