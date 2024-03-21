"use client";
import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export default function Slider({ url }) {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setImages(data);
    };

    fetchImages();
  }, []);

  const sliderRef = useRef();
  const dotRef = useRef();

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;

    // Update dot position
    const index = Math.round(
      sliderRef.current.scrollLeft / sliderRef.current.offsetWidth
    );
    setSelectedImageIndex(index);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const scrolledIndex = Math.round(
      sliderRef.current.scrollLeft / sliderRef.current.offsetWidth
    );
    const scrollX = scrolledIndex * sliderRef.current.offsetWidth;
    sliderRef.current.scrollLeft = scrollX;
  };

  const handleDotClick = (index) => {
    setSelectedImageIndex(index);
    const scrollX = index * sliderRef.current.offsetWidth;
    sliderRef.current.scrollLeft = scrollX;
  };

  useEffect(() => {
    const handleResize = () => {
      // Resize slider width
      sliderRef.current.style.width = window.innerWidth + "px";
      // Adjust scroll position
      const scrollX = selectedImageIndex * sliderRef.current.offsetWidth;
      sliderRef.current.scrollLeft = scrollX;
    };

    // Add event listener for resize event
    window.addEventListener("resize", handleResize);
    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedImageIndex]);

  return (
    <div className="wrapper">
      <div
        ref={dotRef}
        className="slider"
        style={{
          display: "flex",
          border: "5px solid black",
          overflowX: "scroll",
          animation: "1s ease",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {images.map((obj, index) => (
          <div
            key={index}
            className={`dot ${index === selectedImageIndex ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
            style={{
              border: "1px solid black",
              width: "2rem",
              height: "1rem",
            }}
          >
            {obj.id}
          </div>
        ))}
      </div>
      <div
        ref={sliderRef}
        className="slide"
        style={{
          display: "flex",
          border: "5px solid black",
          overflowX: "scroll",
          animation: "1s ease",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {images.map((obj, index) => (
          <img
            key={index}
            src={obj.url}
            alt={`Image ${index}`}
            style={{ width: "100%", height: "auto" }}
          />
        ))}
      </div>
    </div>
  );
}
