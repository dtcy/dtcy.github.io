"use client";
import BackButton from "@/components/BackButton";
import "./style.css";
import { useState } from "react";

export default function StarRating({ noOfStar = 10 }) {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);
  const handleMouseOver = (index) => {
    setHover(index);
    console.log(hover);
  };

  const handleMouseOut = () => {
    setHover(rating);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div className="wrapper">
      <BackButton />
      <div className="stars" style={{ display: "flex" }}>
        {Array(noOfStar)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className={index <= (hover || rating) ? "active" : "inactive"}
              onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut(index)}
              onClick={() => handleClick(index)}
              style={{
                width: "1rem",
                height: "1rem",
                border: "1px solid black",
              }}
            ></div>
          ))}
      </div>
    </div>
  );
}
