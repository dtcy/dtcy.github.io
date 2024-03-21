"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDF7xMEG1iN4_LBVKW_1207AWgNowbDgnQ";

function Test() {
  const [resultText, setResultText] = useState("");

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

  async function generateText(event) {
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      // For text-and-images input (multimodal), use the gemini-pro-vision model
      const model = await genAI.getGenerativeModel({
        model: "gemini-pro-vision",
      });

      const fileInputEl = event.target;
      const imageParts = await Promise.all(
        [...fileInputEl.files].map(fileToGenerativePart)
      );

      const prompt = "what is in the image?";
      const result = await model.generateContent([prompt, ...imageParts]);
      const response = await result.response;
      const text = await response.text();
      setResultText(text);
    } catch (error) {
      console.error("Error generating text:", error);
    }
  }

  return (
    <div>
      <input type="file" accept="image/*" onChange={generateText} />
      <div>{resultText}</div>
    </div>
  );
}

export default Test;
