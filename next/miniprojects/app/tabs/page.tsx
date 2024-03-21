"use client";
import BackButton from "@/components/BackButton";
import React, { useState } from "react";
import Tab from "./Tab";
export default function Tabs() {
  const [data, setData] = useState(null);
  const fetchTest = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const datas = await res.json();
    setData(datas);
    console.log(datas);
  };
  return (
    <div>
      <BackButton />
      <button onClick={() => fetchTest()}>get user data</button>
      <Tab data={data} />
    </div>
  );
}
