"use client";
import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import BackButton from "@/components/BackButton";
import Test from "./test";

const API_KEY = "AIzaSyDF7xMEG1iN4_LBVKW_1207AWgNowbDgnQ";
const genAI = new GoogleGenerativeAI(API_KEY);

function Page() {
  const [result, setResult] = useState(null);
  const inputRef = useRef();
  const fetchData = async () => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = inputRef.current.value;
      const result = await model.generateContent(prompt);

      const text = await result.response.text();
      setResult(text);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <div>
      <BackButton />
      <div className="bar">
        <label htmlFor="promptInput">Enter your prompt: </label>
        <input ref={inputRef} id="promptInput" type="text" />
        <button onClick={fetchData}>Ask</button>
        {result && <div>{result}</div>}
      </div>
      <Test />
    </div>
  );
}

export default Page;
