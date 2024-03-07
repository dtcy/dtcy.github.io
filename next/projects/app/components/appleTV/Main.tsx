import React from "react";
import Login from "./Login";
import Home from "./Home";
import { useLogin } from "./Auth.provider";

export default function Main() {
  const { signState } = useLogin();
  return <div>{signState ? <Home /> : <Login />}</div>;
}
