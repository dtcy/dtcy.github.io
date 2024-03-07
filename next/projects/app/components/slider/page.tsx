"use client";
import { useState } from "react";
import "./page.css";

export default function Page() {
  const imgURLs = [
    { id: 1, url: "https://source.unsplash.com/random/400x400" },
    { id: 2, url: "https://source.unsplash.com/random/400x450" },
    { id: 3, url: "https://source.unsplash.com/random/400x440" },
    { id: 4, url: "https://source.unsplash.com/random/400x430" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === imgURLs.length - 1 ? 0 : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? imgURLs.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="wrap">
      <div className="slider">
        <div className="slides">
          {imgURLs.map((item, index) => (
            <div
              key={item.id}
              className="slide"
              style={{
                transform: `translateX(${index - currentSlide * 100}%)`,
              }}
            >
              <img src={item.url} alt={`Image ${item.id}`} />
            </div>
          ))}
        </div>
      </div>{" "}
      <button
        className={currentSlide === 0 ? "prev-btn hide" : "prev-btn"}
        onClick={prevSlide}
      >
        Prev
      </button>
      <button
        className={
          currentSlide === imgURLs.length - 1 ? "next-btn hide" : "next-btn"
        }
        onClick={nextSlide}
      >
        Next
      </button>
    </div>
  );
}
