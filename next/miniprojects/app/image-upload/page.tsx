"use client";
import BackButton from "@/components/BackButton";
import React from "react";

function ImageUploader() {
  // 이미지 URL
  const imageUrl = "https://source.unsplash.com/random/200x200";

  // 이미지를 가져오고 JSON 형식으로 변환하여 로컬 스토리지에 저장하는 함수
  const saveImageToLocalStorage = async () => {
    try {
      // 이미지 가져오기
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // Blob을 Data URL로 변환
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64Data = reader.result;

        // JSON으로 변환하여 로컬 스토리지에 저장
        const imageData = {
          imageUrl: imageUrl,
          base64Data: base64Data,
        };
        const jsonData = JSON.stringify(imageData);
        localStorage.setItem("imageData", jsonData);

        console.log("Image saved to local storage:", imageData);
      };
    } catch (error) {
      console.error("Error saving image to local storage:", error);
    }
  };

  // 이미지 다운로드 함수
  const downloadImage = () => {
    const savedImageData = localStorage.getItem("imageData");
    if (savedImageData) {
      const imageData = JSON.parse(savedImageData);
      const link = document.createElement("a");
      link.href = imageData.base64Data;
      link.download = "image.jpg";
      link.click();
    } else {
      console.error("No image data found in local storage");
    }
  };

  return (
    <div>
      {" "}
      <BackButton />
      <input type="file" />
      <button onClick={saveImageToLocalStorage}>Upload</button>
      <button onClick={downloadImage}>Download</button>
    </div>
  );
}

export default ImageUploader;
