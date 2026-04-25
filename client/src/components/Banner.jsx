import React, { useState, useEffect } from "react";
import style from "../styles/Banner.module.css";

import bannerImg1 from "../assets/bannerImg1.png";
import bannerImg2 from "../assets/bannerImg2.png";
import bannerImg3 from "../assets/bannerImg3.png";

const images = [bannerImg1, bannerImg2, bannerImg3];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className={style["page"]}>
        <div className={style["banner"]}>
          <div
            className={style["slider-track"]}
            style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}
          >
            {images.map((image, index) => (
              <img key={index} src={image} alt={`Banner ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
