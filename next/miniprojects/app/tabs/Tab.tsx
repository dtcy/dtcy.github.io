"use client";

import React, { useState } from "react";

export default function Tab({ data }) {
  const [toggle, setToggle] = useState({});

  const handleClick = (id) => {
    setToggle((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const toggleSingle = (id) => {
    setToggle((prevState) =>
      prevState === id ? null : { [id]: !prevState[id] }
    );
  };
  return (
    <div>
      {data?.map((item) => (
        <div key={item.id}>
          <span>{item.email}</span>
          <span>
            <button onClick={() => handleClick(item.id)}>multi toggle</button>
            <button onClick={() => toggleSingle(item.id)}>single toggle</button>
          </span>
          <p>
            {toggle === item.id
              ? "single toggle result:" + item.username
              : null}
          </p>
          <p>{toggle[item.id] ? "multi toggle result:" + item.username : ""}</p>{" "}
          <hr />
        </div>
      ))}
    </div>
  );
}
