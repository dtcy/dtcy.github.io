"use client";
import BackButton from "@/components/BackButton";
import React, { useEffect, useRef } from "react";
import "./style.css";
import Card from "./Card";
function Page() {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
          }
        });
      },
      { threshold: 1 }
    );

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      observer.current.observe(card);
    });

    return () => observer.current.disconnect();
  }, []);

  return (
    <div>
      <BackButton />
      <div className="container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}

export default Page;
