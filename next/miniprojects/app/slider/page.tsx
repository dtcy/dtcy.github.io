"use client";
import BackButton from "@/components/BackButton";
import React, { useEffect, useRef, useState } from "react";
import Slider from "./Slider";
export default function Page() {
  return (
    <div className="wrapper">
      <div className="back">
        <BackButton />
      </div>
      <Slider url={"https://jsonplaceholder.typicode.com/photos/"} />
    </div>
  );
}
