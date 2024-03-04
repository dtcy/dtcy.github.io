import React from "react";
import { value } from "./page";
import { useState, useRef } from "react";
export default function Square({ value }) {
  console.log(value);
  return <div className="square">{value}</div>;
}
