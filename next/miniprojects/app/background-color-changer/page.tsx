"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";

export default function page() {
  const [value, setValue] = useState("black");
  const [mode, setMode] = useState("RGB");
  const inputChange = (e) => {
    setValue(e.target.value);
  };
  const hexMode = () => {
    setValue("#000000");
    setMode("Hex");
  };
  const rgbMode = () => {
    setValue("rgb(255,255,255)");
    setMode("RGB");
  };
  const randomColor = () => {
    const randomRGB = "rgb(xxx,xxx,xxx)";
    const randomThreeNumber = Math.floor(Math.random());
    console.log(randomThreeNumber);
    const hex = [0, 1, 2, 3, "a", "b", "c", "d", "F", 4, 5, 6, 7, 8, 9];
    const randomHex = [];
    for (let i = 0; i < 6; i++) {
      randomHex.push(hex[Math.floor(Math.random() * 10)]);
    }

    if (mode === "RGB") {
      setValue(randomRGB);
    } else if (mode === "Hex") {
      setValue(randomHex.join(""));
    }
  };
  return (
    <div style={{ backgroundColor: value }}>
      <BackButton />
      <div className="buttons">
        <button onClick={hexMode}>Hex Mode</button>
        <button onClick={rgbMode}>RGB Mode</button>
        <button onClick={randomColor}>Random Colour</button>
      </div>
      <input type="text" value={value} onChange={(e) => inputChange(e)} />
    </div>
  );
}
