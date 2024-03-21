"use client";
import BackButton from "@/components/BackButton";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
export default function Page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const containerRef = useRef();
  const observer = useRef();
  const loadMore = useRef();
  useEffect(() => {
    fetchData();
    return () => observer.current?.disconnect();
  }, []);

  const fetchData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=5`
    );
    const newData = await res.json();
    setData((prevData) => [...prevData, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };
  const loadMoreClick = () => {
    fetchData();
  };
  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && data.length < 5000) {
          fetchData();
        }
      });
    });

    // if (loadMore.current) {
    //   observer.current.observe(loadMore.current);
    // }
  }, [data]);

  return (
    <div>
      <BackButton />
      <Link href="/load-more/card">
        <button>card</button>
      </Link>

      {data.map((item, index) => (
        <img
          style={{ display: "flex", flexDirection: "column", width: "10rem" }}
          key={index}
          src={item.url}
          alt=""
        />
      ))}
      <div ref={containerRef}></div>
      <button onClick={loadMoreClick} ref={loadMore}>
        load more
      </button>
    </div>
  );
}
